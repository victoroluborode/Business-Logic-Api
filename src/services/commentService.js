const BaseService = require("./baseService");

class CommentService extends BaseService {
    constructor(organizationId) {
        super(organizationId)
    }

    async createComment(commentData) {
        return await this.commentRepository.create({data: commentData})
    }

    async getCommentById(commentId) {
        return await this.commentRepository.findUnique({ where: { id: commentId } });
    }

    async getComments(commentQuery) {
        return await this.commentRepository.findMany({ where: commentQuery });
    }

    async deleteCommentById(commentId) {
        return await this.commentRepository.delete({ where: { id: commentId } });
    }

    async updateComment(commentId, commentData) {
        return await this.commentRepository.update({
            where: { id: commentId },
            data: {...commentData}
        })
    }
}

module.exports = CommentService;