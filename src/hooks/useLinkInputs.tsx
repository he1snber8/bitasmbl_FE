import { useState } from "react";
import { ProjectLink } from "../interfaces/projects/projectTypes";

export const useLinkInputs = () => {
  const [linkInputs, setLinkInputs] = useState<ProjectLink[]>([
    { urlName: "", urlValue: "" },
  ]);

  const addInput = () => {
    if (linkInputs.length < 3)
      setLinkInputs((prev) => [...prev, { urlName: "", urlValue: "" }]);
  };

  const deleteInput = (index: number) => {
    if (linkInputs.length > 1) {
      setLinkInputs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateUrlName = (index: number, value: string) => {
    setLinkInputs((prev) =>
      prev.map((link, i) => (i === index ? { ...link, urlName: value } : link))
    );
  };

  const updateUrlValue = (index: number, value: string) => {
    setLinkInputs((prev) =>
      prev.map((link, i) => (i === index ? { ...link, urlValue: value } : link))
    );
  };

  return {
    linkInputs,
    setLinkInputs,
    addInput,
    deleteInput,
    updateUrlName,
    updateUrlValue,
  };
};
