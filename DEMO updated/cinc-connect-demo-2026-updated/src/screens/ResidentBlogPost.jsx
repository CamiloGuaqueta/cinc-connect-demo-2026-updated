import sarahPhoto from '../images/sarah1.jpg'
import './ResidentBlogPost.css'

const CATEGORY_COLORS = {
  lime:  { bg: 'rgba(178, 222, 97, 0.15)',  color: '#B2DE61' },
  amber: { bg: 'rgba(255, 183,  77, 0.15)', color: '#ffb74d' },
  blue:  { bg: 'rgba(100, 160, 255, 0.15)', color: '#64a0ff' },
}

export default function ResidentBlogPost({ post }) {
  const cc = CATEGORY_COLORS[post.categoryColor] || CATEGORY_COLORS.lime

  return (
    <div className="screen rbp-screen">
      {post.heroImage && (
        <div className="rbp-hero">
          <img src={post.heroImage} alt="" className="rbp-hero-img" />
          <div className="rbp-hero-overlay" />
        </div>
      )}
      <div className="rbp-header">
        <span className="rbp-category" style={{ background: cc.bg, color: cc.color }}>
          {post.category}
        </span>
        <h1 className="rbp-title">{post.title}</h1>
        <div className="rbp-meta">
          <img src="{sarahPhoto}" alt="Sarah Mitchell" className="rbp-author-avatar rbp-author-avatar--photo" />
          <div className="rbp-meta-text">
            <span className="rbp-author-name">Sarah Mitchell</span>
            <span className="rbp-meta-sub">{post.date} · {post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="rbp-body">
        {post.paragraphs.map((p, i) => (
          <p key={i} className="rbp-paragraph">{p}</p>
        ))}

        <div className="rbp-footer">
          <div className="rbp-author-card">
            <img src="{sarahPhoto}" alt="Sarah Mitchell" className="rbp-footer-avatar rbp-footer-avatar--photo" />
            <div>
              <p className="rbp-footer-name">Sarah Mitchell</p>
              <p className="rbp-footer-title">Senior Real Estate Agent · Cardinal Realty Group</p>
              <p className="rbp-footer-contact">(407) 555-0192</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
