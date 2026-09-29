export type TimelineEntry = {
  title: string;
  place: string;
  placeUrl: string;
  image: string;
  timePeriod: string;
  contentParagraphs: string[];
};

export type EditableProfile = {
  techStaff: string[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
};

export function emptyTimelineEntry(): TimelineEntry {
  return {
    title: "",
    place: "",
    placeUrl: "",
    image: "",
    timePeriod: "",
    contentParagraphs: [""],
  };
}
