import { GetServerSideProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { Post, PostService } from "vitorpmaringolo-sdk";
import { ResourceNotFoundError } from "vitorpmaringolo-sdk/dist/errors";
import Markdown from "../../../components/Markdown";
import PostHeader from "../../../components/PostHeader";

interface PostProps extends NextPageProps {
  post?: Post.Detailed;
  host?: string;
}

export default function PostPage(props: PostProps) {
  const { post } = props;
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`http://${props.host}/posts/${props.post?.id}/${props.post?.slug}`}
        />
      </Head>
      {post && (
        <>
          <PostHeader
            thumbnail={post?.imageUrls.large}
            createdAt={post?.createdAt}
            editor={post?.editor}
            title={post?.title}
          />
          <Markdown>{post.body}</Markdown>
        </>
      )}
    </>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
  slug: string;
}

export const getServerSideProps: GetServerSideProps<PostProps, Params> =
  async ({ params, res, req }) => {
    try {
      if (!params) return { notFound: true };

      const { id, slug } = params;
      const postId = Number(id);

      if (isNaN(postId)) return { notFound: true };

      const post = await PostService.getExistingPost(postId);

      return {
        props: {
          post,
          host: req.headers.host,
        },
      };
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return { notFound: true };
      }
      return {
        props: {
          error: {
            message: error.message,
            statusCode: error.data?.status || 500,
          },
        },
      };
    }
  };
