import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { apiAxios } from "../axios";
import { invalidateQueries } from "../config/react-query";
import { Comment, CreateElement, IdOnly } from "../global/interfaces";

export function useCommentsMutation(person: IdOnly) {
  const { mutateAsync: addComment, isLoading: addLoading } = useMutation<
    void,
    AxiosError,
    CreateElement<Comment>
  >(
    ["/persons/comment", person._id],
    (data) => {
      return apiAxios.post("/persons/" + person._id + "/comment", data);
    },
    {
      onSuccess: () => {
        //invalidate cache, optimistic update
        invalidateQueries({ queryKey: "/persons" });
      },
    }
  );

  const { mutateAsync: deleteComment, isLoading: deleteLoading } = useMutation<
    void,
    AxiosError,
    IdOnly
  >(
    ["/persons/comment", person._id],
    (data) => {
      return apiAxios.delete("/persons/" + person._id + "/comment/" + data._id);
    },
    {
      onSuccess: () => {
        //invalidate cache, optimistic update
        invalidateQueries({ queryKey: "/persons" });
      },
    }
  );

  const { mutateAsync: updateComment, isLoading: updateLoading } = useMutation<
    void,
    AxiosError,
    Comment
  >(
    ["/persons/comment", person._id],
    (data) => {
      return apiAxios.put(
        "/persons/" + person._id + "/comment/" + data._id,
        data
      );
    },
    {
      onSuccess: () => {
        //invalidate cache, optimistic update
        invalidateQueries({ queryKey: "/persons" });
      },
    }
  );

  return {
    createComment: addComment,
    removeComment: deleteComment,
    updateComment: updateComment,
    isLoading: deleteLoading || updateLoading || addLoading,
  };
}
