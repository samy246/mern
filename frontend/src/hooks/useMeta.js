import { useEffect } from "react";

export const useMeta = ({ title, description }) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector("meta[name='description']");
      if (meta) {
        meta.setAttribute("content", description);
      } else {
        meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
};
