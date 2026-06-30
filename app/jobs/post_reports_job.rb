# frozen_string_literal: true

class PostReportsJob
  include Sidekiq::Job

  def perform(post_id, user_id)
    ActionCable.server.broadcast(user_id, { notice: I18n.t("report.render"), progress: 25 })

    post = Post.includes(:categories, :user).find(post_id)
    html_report = ApplicationController.render(
      assigns: { post: },
      template: "posts/report/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { notice: I18n.t("report.generate"), progress: 50 })

    pdf_report = WickedPdf.new.pdf_from_string(html_report)
    current_user = User.find(user_id)

    ActionCable.server.broadcast(user_id, { notice: I18n.t("report.upload"), progress: 75 })

    current_user.report.purge_later if current_user.report.attached?
    current_user.report.attach(
      io: StringIO.new(pdf_report),
      filename: "#{post.slug}.pdf",
      content_type: "application/pdf"
    )
    current_user.save

    ActionCable.server.broadcast(user_id, { notice: I18n.t("report.attach"), progress: 100 })
  end
end
