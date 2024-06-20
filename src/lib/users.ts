import { clerkClient, type User } from "@clerk/nextjs/server";
import { type Comment } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { type TipsWithRatingsAndCountComments } from "~/server/api/routers/tip";

export const filterUserFromClient = (user: User) => {
  return {
    id: user.id,
    username: user.username ?? user.firstName,
    imageUrl: user.imageUrl,
  };
};

const getUser = async (id: string) => {
  return await clerkClient.users.getUser(id);
};

export const addUsersToTipWithRatingAndCountComment = async (
  tips: TipsWithRatingsAndCountComments,
) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: tips.map((tip) => tip.authorId),
      limit: 100,
    })
  ).data.map(filterUserFromClient);

  return tips.map((tip) => {
    const author = users.find((user) => user.id === tip.authorId);

    if (author === undefined)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author for tip not found",
      });

    return {
      ...tip,
      author,
    };
  });
};

export const addUsersToComments = async (comments: Comment[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: comments.map((comment) => comment.authorId),
      limit: 100,
    })
  ).data.map(filterUserFromClient);

  return comments.map((comment) => {
    const author = users.find((user) => user.id === comment.authorId);

    if (author === undefined)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Author for comment not found",
      });

    return {
      ...comment,
      author,
    };
  });
};

// const addUsersDataToPosts = async (posts: Post[]) => {
//     const users = (
//       await clerkClient.users.getUserList({
//         userId: posts.map((post) => post.authorId),
//         limit: 100,
//       })).map(filterUserFromClient)

//     return posts.map(post => {
//       const author = users.find((user) => user.id === post.authorId)

//       if (!author || !author.username) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Author for post not found" })

//       return {
//         post,
//         author: {
//           ...author,
//           username: author.username
//         }
//       }
//     });
//   }
