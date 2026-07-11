import { useState } from 'react'

export default function ReaksiEmoji() {
  // Daftar lengkap emoji yang bisa digunakan
  const SEMUA_EMOJI = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜',
    '🤪', '😌', '😑', '😐', '😶', '🤐', '🤨', '🤔',
    '🤫', '🤭', '🤫', '🤐', '🤨', '😐', '😑', '😌',
    '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
    '🤮', '🤧', '🤬', '🤡', '😈', '👿', '💀', '☠️',
    '💩', '🤓', '😎', '🤩', '🥳', '😕', '😟', '🙁',
    '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
    '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣',
    '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠',
    '🤬', '😈', '👿', '💋', '👋', '🤚', '🖐️', '✋',
    '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🫰', '🤟',
    '🤘', '🤙', '👍', '👎', '👊', '👏', '🙌', '👐',
    '🤲', '🤝', '🤜', '🤛', '🦾', '🦿', '🦵', '🦶',
    '👂', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅'
  ]

  // State untuk menyimpan reaksi
  const [daftarReaksi, setDaftarReaksi] = useState({})
  const [reaksiUser, setReaksiUser] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Handle ketika user pilih emoji
  const handlePilihEmoji = (emoji) => {
    setDaftarReaksi(prev => {
      const baru = { ...prev }

      // Jika sudah ada reaksi yang sama, hapus
      if (baru[emoji]) {
        if (reaksiUser === emoji) {
          baru[emoji]--
          if (baru[emoji] === 0) {
            delete baru[emoji]
          }
          setReaksiUser(null)
        } else {
          baru[emoji]++
        }
      } else {
        // Emoji baru, tambah dengan jumlah 1
        baru[emoji] = 1
      }

      // Jika user ganti reaksi, kurangi yang lama
      if (reaksiUser && reaksiUser !== emoji && baru[reaksiUser]) {
        baru[reaksiUser]--
        if (baru[reaksiUser] === 0) {
          delete baru[reaksiUser]
        }
      }

      return baru
    })

    // Update reaksi user
    if (reaksiUser === emoji) {
      setReaksiUser(null)
    } else {
      setReaksiUser(emoji)
    }

    setShowEmojiPicker(false)
  }

  // Hitung total reaksi
  const totalReaksi = Object.values(daftarReaksi).reduce((acc, val) => acc + val, 0)

  // Urutkan reaksi berdasarkan jumlah terbanyak
  const reaksiTerurut = Object.entries(daftarReaksi)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10) // Tampilkan max 10 reaksi teratas

  return (
    <div className="w-full max-w-3xl">
      {/* Konten Utama */}
      <div className="bg-slate-800 rounded-lg shadow-2xl p-8 mb-6">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Senzyt
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Platform Berbagi Reaksi dengan Semua Emoji 🎉
        </p>

        {/* Area Konten */}
        <div className="bg-slate-700 rounded-lg p-6 mb-6">
          <img
            src="https://via.placeholder.com/600x300?text=Konten+Senzyt"
            alt="Konten"
            className="w-full rounded-lg mb-4"
          />
          <p className="text-slate-200 text-lg">
            Ini adalah konten terbaru di Senzyt! Kamu bisa memberikan reaksi dengan emoji apapun yang kamu inginkan. Ada ratusan emoji yang bisa dipilih! 🚀
          </p>
        </div>

        {/* Tampilkan Total Reaksi */}
        <div className="text-slate-300 mb-4 font-semibold text-lg">
          Total Reaksi: <span className="text-cyan-400">{totalReaksi}</span>
        </div>

        {/* Container Tombol Reaksi yang Sudah Dipilih */}
        {reaksiTerurut.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            {reaksiTerurut.map(([emoji, jumlah]) => (
              <button
                key={emoji}
                onClick={() => handlePilihEmoji(emoji)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full
                  transition-all duration-200 transform hover:scale-110
                  font-medium text-sm
                  ${reaksiUser === emoji
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300 scale-105'
                    : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                  }
                `}
                title={`Klik untuk ${reaksiUser === emoji ? 'lepas' : 'ganti'} reaksi`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-bold">{jumlah}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tombol Buka Emoji Picker */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {showEmojiPicker ? '❌ Tutup Emoji' : '➕ Tambah Reaksi'}
          </button>
        </div>

        {/* Emoji Picker Grid */}
        {showEmojiPicker && (
          <div className="bg-slate-700 rounded-lg p-4 mb-6 max-h-96 overflow-y-auto">
            <p className="text-slate-400 text-sm mb-3">Pilih emoji untuk bereaksi:</p>
            <div className="grid grid-cols-8 gap-2 md:grid-cols-10">
              {SEMUA_EMOJI.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePilihEmoji(emoji)}
                  className={`
                    text-3xl p-2 rounded-lg transition-all duration-150
                    transform hover:scale-125 cursor-pointer
                    ${daftarReaksi[emoji]
                      ? 'bg-blue-500 ring-2 ring-blue-300'
                      : 'hover:bg-slate-600 bg-slate-600'
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

        {/* Info */}
        <div className="bg-slate-700 rounded-lg p-4 text-center">
          {reaksiUser ? (
            <p className="text-slate-200">
              <span className="text-2xl">{reaksiUser}</span> Reaksi mu saat ini
            </p>
          ) : (
            <p className="text-slate-400">Pilih emoji di atas untuk memberikan reaksi pertamamu!</p>
          )}
        </div>
      </div>

      {/* Statistik */}
      {totalReaksi > 0 && (
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-slate-300 font-semibold mb-3">📊 Reaksi Terpopuler:</h3>
          <div className="space-y-2">
            {reaksiTerurut.map(([emoji, jumlah], idx) => (
              <div key={emoji} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-slate-400">Orang memberikan reaksi ini</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                      style={{ width: `${(jumlah / totalReaksi) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-cyan-400 w-8 text-right">{jumlah}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
