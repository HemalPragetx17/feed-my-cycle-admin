import { Blog } from '../../types/request_data/blog';

export const BLOGJSON = {
  addBlog: ({ title, content, image, isPublished, isDraft }: Blog) => {
    let form = new FormData();
    form.append('title', title);
    form.append('content', content);
    form.append('image', image);
    if (isPublished !== undefined) {
      form.append('isPublished', String(isPublished));
    }
    if (isDraft !== undefined) {
      form.append('isDraft', String(isDraft));
    }
    return form
  },
  editBlog: ({ title, content, image, isPublished, isDraft }: Blog) => {
    let form = {
      title: title,
      content: content,
      image: image,
      isPublished: isPublished,
      isDraft: isDraft
    }
    return form
  },
}
