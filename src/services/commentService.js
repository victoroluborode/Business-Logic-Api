const BaseService = require("./baseService");

class CommentService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createComment(commentData) {
         if (!commentData) {
           throw new Error("commentData is required");
         }
        
        if (typeof commentData !== "object") {
          throw new Error("commentData must be an object");
        }
        return await this.commentRepository.create({data: commentData})
    }

    async getCommentById(commentId) {
        if (!commentId) {
          throw new Error("commentId is required");
        }
        return await this.commentRepository.findUnique({ where: { id: commentId } });
    }

    async getComments(commentQuery) {
        if (!commentQuery) {
          throw new Error("commentQuery is required");
        }

        if (typeof commentQuery !== "object") {
          throw new Error("commentQuery must be an object");
        }
        return await this.commentRepository.findMany({ where: commentQuery });
    }

    async deleteCommentById(commentId) {
        if (!commentId) {
          throw new Error("commentId is required");
        }
        return await this.commentRepository.delete({ where: { id: commentId } });
    }

    async updateComment(commentId, commentData) {
        if (!commentId || !commentData) {
          throw new Error("commentId and commentData are required");
        }

        if (typeof commentData !== "object") {
          throw new Error("commentData must be an object");
        }
        return await this.commentRepository.update({
            where: { id: commentId },
            data: {...commentData}
        })
    }
}

module.exports = CommentService;