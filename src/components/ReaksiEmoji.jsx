import { useState, useEffect } from 'react'

export default function ReaksiEmoji() {
  const SEMUA_EMOJI = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜',
    '🤪', '😑', '😐', '😶', '🤐', '🤨', '🤔', '🤫',
    '🤭', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
    '🤢', '🤮', '🤧', '🤬', '🤡', '😈', '👿', '💀',
    '💩', '🤓', '😎', '🤩', '🥳', '😕', '😟', '🙁',
    '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
    '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
    '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠',
    '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏',
    '✌️', '🤞', '🤟', '🤘', '🤙', '👍', '👎', '👊',
    '👏', '🙌', '👐', '🤲', '🤝', '🤜', '🤛', '❤️',
    '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎',
    '💔', '💕', '💞', '💓', '💗', '💖', '💘', '💝',
    '💟', '👁️', '👀', '🧠', '🔥', '💥', '✨', '⭐',
    '💫', '🌟', '💯', '🎉', '🎊', '🎈', '🎁', '🚀',
    '🌈', '☀️', '🌙', '⚡', '💧', '❄️', '🍕', '🍔',
    '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🍱',
    '🍜', '🍝', '🍛', '🍲', '🥘', '🍲', '🥟', '🦪'
  ]

  // State utama
  const [reactions, setReactions] = useState({})
  const [userReaction, setUserReaction] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const [currentPostId, setCurrentPostId] = useState(1)

  // Simulate loading data dari server
  useEffect(() => {
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: 'Konten Pertama Senzyt',
          image: 'https://via.placeholder.com/600x300?text=Konten+1',
          description: 'Ini adalah konten terbaru di Senzyt! Berikan reaksi dengan emoji apapun. Sistem ini menyimpan data secara real-time!'
        },
        {
          id: 2,
          title: 'Konten Kedua Senzyt',
          image: 'https://via.placeholder.com/600x300?text=Konten+2',
          description: 'React dengan berbagai emoji untuk menunjukkan perasaanmu terhadap konten ini. Data tersimpan dan bisa dilihat orang lain!'
        },
        {
          id: 3,
          title: 'Konten Ketiga Senzyt',
          image: 'https://via.placeholder.com/600x300?text=Konten+3',
          description: 'Sistem reaksi emoji kami bekerja real-time. Setiap reaksi yang kamu buat langsung terlihat dan dihitung!'
        }
      ])
      loadReactions(1)
      setLoading(false)
    }, 500)
  }, [])

  // Load reactions dari localStorage (simulate database)
  const loadReactions = (postId) => {
    const stored = localStorage.getItem(`post_${postId}_reactions`)
    const storedUserReaction = localStorage.getItem(`post_${postId}_userReaction`)
    
    if (stored) {
      setReactions(JSON.parse(stored))
    } else {
      setReactions({})
    }
    
    if (storedUserReaction) {
      setUserReaction(storedUserReaction)
    } else {
      setUserReaction(null)
    }
  }

  // Save reactions ke localStorage
  const saveReactions = (newReactions, newUserReaction) => {
    localStorage.setItem(`post_${currentPostId}_reactions`, JSON.stringify(newReactions))
    localStorage.setItem(`post_${currentPostId}_userReaction`, newUserReaction)
  }

  // Handle pilih emoji
  const handleReact = (emoji) => {
    setShowPicker(false)
    
    const newReactions = { ...reactions }

    // Jika user sudah punya reaksi lain, kurangi yang lama
    if (userReaction && userReaction !== emoji) {
      if (newReactions[userReaction] > 0) {
        newReactions[userReaction]--
        if (newReactions[userReaction] === 0) {
          delete newReactions[userReaction]
        }
      }
    }

    // Jika klik emoji yang sama dua kali, hapus
    if (userReaction === emoji) {
      if (newReactions[emoji] > 0) {
        newReactions[emoji]--
        if (newReactions[emoji] === 0) {
          delete newReactions[emoji]
        }
      }
      setUserReaction(null)
      saveReactions(newReactions, null)
      setReactions(newReactions)
      return
    }

    // Tambah reaksi baru
    newReactions[emoji] = (newReactions[emoji] || 0) + 1
    setReactions(newReactions)
    setUserReaction(emoji)
    saveReactions(newReactions, emoji)
  }

  // Hitung total reaksi
  const totalReactions = Object.values(reactions).reduce((a, b) => a + b, 0)

  // Sort reaksi terbanyak
  const sortedReactions = Object.entries(reactions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)

  // Switch post
  const handleSwitchPost = (postId) => {
    setCurrentPostId(postId)
    loadReactions(postId)
  }

  const currentPost = posts.find(p => p.id === currentPostId)

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">🚀</div>
          <p className="text-slate-400 text-lg">Loading Senzyt...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-8 mb-6">
        <h1 className="text-5xl font-black text-white text-center mb-2">
          🎉 SENZYT 🎉
        </h1>
        <p className="text-center text-blue-100 text-lg">
          Platform Reaksi Emoji Real-Time dengan Data Tersimpan
        </p>
      </div>

      {/* Post Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {posts.map(post => (
          <button
            key={post.id}
            onClick={() => handleSwitchPost(post.id)}
            className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
              currentPostId === post.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Konten {post.id}
          </button>
        ))}
      </div>

      {/* Post Content */}
      {currentPost && (
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 mb-6">
          <h2 className="text-3xl font-bold text-white mb-4">{currentPost.title}</h2>
          
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full rounded-lg mb-6 shadow-lg hover:scale-105 transition-transform"
          />
          
          <p className="text-slate-200 text-lg mb-8 leading-relaxed">
            {currentPost.description}
          </p>

          {/* Total Reactions Counter */}
          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <p className="text-xl font-bold text-white">
              📊 Total Reaksi: <span className="text-cyan-400">{totalReactions}</span>
            </p>
          </div>

          {/* Active Reactions */}
          {sortedReactions.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-6 mb-6">
              <p className="text-slate-300 font-semibold mb-3">Reaksi yang ada:</p>
              <div className="flex flex-wrap gap-3">
                {sortedReactions.map(([emoji, count]) => (
                  <button
                    key={emoji}
                    onClick={() => handleReact(emoji)}
                    className={`
                      flex items-center gap-2 px-5 py-3 rounded-full
                      transition-all duration-200 transform hover:scale-110 active:scale-95
                      font-bold text-base
                      ${userReaction === emoji
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white ring-3 ring-blue-300 shadow-lg scale-110'
                        : 'bg-slate-600 text-white hover:bg-slate-500'
                      }
                    `}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <span>{count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Emoji Picker Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className={`
                px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300
                transform hover:scale-105 active:scale-95 shadow-lg
                ${showPicker
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                }
              `}
            >
              {showPicker ? '❌ TUTUP PICKER' : '➕ BERI REAKSI'}
            </button>
          </div>

          {/* Emoji Picker Grid */}
          {showPicker && (
            <div className="bg-slate-700 rounded-lg p-6 mb-6 border-2 border-blue-500">
              <p className="text-slate-300 font-semibold mb-4">Pilih emoji untuk bereaksi:</p>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-12 max-h-96 overflow-y-auto">
                {SEMUA_EMOJI.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleReact(emoji)}
                    className={`
                      text-4xl p-2 rounded-lg transition-all duration-150
                      transform hover:scale-150 active:scale-100 cursor-pointer
                      ${reactions[emoji]
                        ? 'bg-blue-600 ring-2 ring-blue-300'
                        : 'bg-slate-600 hover:bg-slate-500'
                      }
                    `}
                    title={`Bereaksi dengan ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User Reaction Display */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-6 text-center border-2 border-purple-500">
            {userReaction ? (
              <div>
                <p className="text-slate-300 mb-2">Reaksi mu saat ini:</p>
                <p className="text-6xl mb-2 animate-bounce">{userReaction}</p>
                <p className="text-slate-300 text-sm">(Klik reaksi 2x atau pilih emoji lain untuk ganti)</p>
              </div>
            ) : (
              <div>
                <p className="text-slate-400 text-lg">Belum ada reaksi dari mu</p>
                <p className="text-slate-500 text-sm mt-2">Pilih emoji di atas untuk mulai bereaksi!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Statistics Section */}
      {totalReactions > 0 && (
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">📈 Statistik Reaksi</h3>
          <div className="space-y-4">
            {sortedReactions.map(([emoji, count], idx) => {
              const percentage = ((count / totalReactions) * 100).toFixed(1)
              return (
                <div key={emoji} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <span className="text-4xl">{emoji}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-slate-700 rounded-full h-8 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full flex items-center justify-end pr-2 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage > 10 && (
                          <span className="text-white font-bold text-sm">{percentage}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-white font-bold text-lg">{count}</p>
                    <p className="text-slate-400 text-sm">orang</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-slate-800 rounded-lg p-6 text-center text-slate-400 border-t-2 border-slate-700">
        <p>💾 Data reaksi tersimpan otomatis di browser mu</p>
        <p className="text-sm mt-2">Setiap reaksi real-time diperbarui dan dihitung otomatis</p>
      </div>

      <div className="h-8"></div>
    </div>
  )
}
