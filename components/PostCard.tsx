import { Post } from "vitorpmaringolo-sdk";

interface PostCardProps {
  post: Post.Summary;
}

export default function PostCard(props: PostCardProps) {
  return <div>{props.post.title}</div>;
}
