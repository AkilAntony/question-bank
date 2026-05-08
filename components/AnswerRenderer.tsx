"use client";

import { useEffect, useMemo, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";

const AnswerRenderer = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null);

    const sanitizedHtml = useMemo(() => {
  
    return DOMPurify.sanitize(html);
  }, [html]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pres = el.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.style.cssText =
        "position:absolute;top:8px;right:8px;padding:4px 10px;border-radius:6px;" +
        "font-size:11px;font-weight:500;background:#1e293b;color:#64748b;border:1px solid #334155;" +
        "cursor:pointer;transition:all .15s;";
    
      btn.onclick = async () => {
        const code = pre.querySelector("code");
        const text = code?.textContent || pre.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 2000);
        } catch {
          btn.textContent = "Failed";
        }
      };

      pre.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="text-[#475569] text-[14px] leading-relaxed mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};


export default AnswerRenderer