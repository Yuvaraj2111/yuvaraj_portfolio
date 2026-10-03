import type { Achievement, Interest } from "@/types";
import { projects } from "./projects";

/** Only factual numbers here. Add a date or metric when you have the real one. */
export const achievements: Achievement[] = [
  {
    title: "ICU Achiever Award",
    detail: "Recognised as a best employee at ICU Medical.", // add the year if you want it shown
  },
  {
    title: "CI execution ownership",
    detail: "Owned CI execution across multiple PlumDuo and PlumSolo software releases.",
    metric: { value: 2, label: "product lines" },
  },
  {
    title: "Reusable automation tools",
    detail: "Developed reusable engineering automation tools and test framework enhancements.",
  },
  {
    title: "Prototype leadership",
    detail: "Took managerial responsibility for a medical visualization prototype.",
  },
];

export const stats = [
  { value: 3, suffix: "+", label: "years shipping clinical software" },
  { value: 84, suffix: "%", label: "MCA, CEG – Anna University" },
  { value: projects.length, label: "featured projects" },
];

/** Drop photos into /public/images/life and set `image`. */
export const interests: Interest[] = [
  { title: "Travel", note: "New places, slow mornings.", icon: "plane" },
  { title: "Fitness", note: "Gym, most days of the week.", icon: "dumbbell" },
  { title: "Cricket", note: "Weekend matches.", icon: "trophy" },
  { title: "Table tennis", note: "Quick reflexes, quicker rallies.", icon: "zap" },
  { title: "Snooker", note: "Patience on green baize.", icon: "circle-dot" },
  { title: "Music", note: "Always something playing.", icon: "music" },
  { title: "Exploring technology", note: "Side experiments and new tools.", icon: "cpu" },
];
