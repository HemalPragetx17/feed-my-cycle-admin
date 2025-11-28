type StatusOption = {
  value: string;
  label: string;
  title: string;
};

export const UserStatusOptions: StatusOption[] = [
  {
    value: "Active",
    label: "Active",
    title: "Active",
  },
  {
    value: "InActive",
    label: "In Active",
    title: "In Active",
  },
];

export const BlogStatusOptions: StatusOption[] = [
  {
    value: "published",
    label: "Published",
    title: "Published",
  },
  {
    value: "draft",
    label: "Draft",
    title: "Draft",
  },
];