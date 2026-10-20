"use client";

import { useEffect } from "react";

type CustomCodeInjectorProps = {
  html?: string | null;
  id: "head" | "body-start" | "footer";
};

const injected = new Map<string, string>();

function createNode(node: Node): Node {
  if (node instanceof HTMLScriptElement) {
    const script = document.createElement("script");

    for (const attribute of Array.from(node.attributes)) {
      script.setAttribute(attribute.name, attribute.value);
    }

    script.textContent = node.textContent;

    return script;
  }

  if (node instanceof Element) {
    const element = node.cloneNode(false) as Element;

    for (const child of Array.from(node.childNodes)) {
      element.appendChild(createNode(child));
    }

    return element;
  }

  return node.cloneNode(true);
}

function insertNode(
  node: Node,
  target: HTMLElement,
  position: "prepend" | "append",
  anchor: Node | null,
) {
  if (position === "prepend") {
    target.insertBefore(node, anchor);
  } else {
    target.appendChild(node);
  }
}

async function injectNodes(
  nodes: Node[],
  target: HTMLElement,
  position: "prepend" | "append",
) {
  // Insert before the existing first child, preserving source order.
  const anchor = position === "prepend" ? target.firstChild : null;

  for (const node of nodes) {
    const element = createNode(node);

    if (element instanceof HTMLScriptElement) {
      await new Promise<void>((resolve, reject) => {
        const isExternal = Boolean(element.src);
        const isModule = element.type === "module";

        if (isExternal) {
          // Preserve execution order for classic external scripts.
          if (!isModule) {
            element.async = false;
          }

          element.addEventListener("load", () => resolve(), {
            once: true,
          });

          element.addEventListener(
            "error",
            () => {
              reject(new Error(`Failed to load script: ${element.src}`));
            },
            { once: true },
          );
        } else if (isModule) {
          element.addEventListener("load", () => resolve(), {
            once: true,
          });

          element.addEventListener(
            "error",
            () => {
              reject(new Error("Failed to execute inline module script"));
            },
            { once: true },
          );
        }

        insertNode(element, target, position, anchor);

        if (!isExternal && !isModule) {
          // Classic inline scripts execute synchronously on insertion.
          resolve();
        }
      });
    } else {
      insertNode(element, target, position, anchor);
    }
  }
}

export default function CustomCodeInjector({
  html,
  id,
}: CustomCodeInjectorProps) {
  useEffect(() => {
    const content = html?.trim();

    if (!content) return;

    const marker = `custom-code-${id}`;

    // Prevent duplicate injection, including concurrent effects.
    if (document.documentElement.hasAttribute(`data-${marker}`)) {
      return;
    }

    // Claim the slot synchronously, before any asynchronous work.
    document.documentElement.setAttribute(`data-${marker}`, "pending");

    let cancelled = false;

    async function run() {
      const template = document.createElement("template");
      template.innerHTML = content ? content : "";

      const target = id === "head" ? document.head : document.body;
      const position = id === "body-start" ? "prepend" : "append";

      try {
        await injectNodes(
          Array.from(template.content.childNodes),
          target,
          position,
        );

        if (cancelled) return;

        injected.set(id, content ? content : "");

        document.documentElement.setAttribute(`data-${marker}`, "true");

      } catch (error) {
        // Allow a later attempt if injection failed.
        document.documentElement.removeAttribute(`data-${marker}`);
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [html, id]);

  return null;
}