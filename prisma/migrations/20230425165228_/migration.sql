-- CreateTable
CREATE TABLE "CommentReaction" (
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "reactionId" INTEGER NOT NULL,

    CONSTRAINT "CommentReaction_pkey" PRIMARY KEY ("commentId","userId")
);

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReaction" ADD CONSTRAINT "CommentReaction_reactionId_fkey" FOREIGN KEY ("reactionId") REFERENCES "Reaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
