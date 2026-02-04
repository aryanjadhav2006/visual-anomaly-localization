import { useState, useEffect, useRef } from "react"

export default function App() {
  const canvasRef = useRef(null)

  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mask, setMask] = useState(null)
  const [opacity, setOpacity] = useState(0.6)
  const [showMask, setShowMask] = useState(true)
  const [showGuide, setShowGuide] = useState(false)

  // 🔄 RESET
  const handleReset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setMask(null)
    setOpacity(0.6)
    setShowMask(true)
    setLoading(false)
  }

  // 🌌 STARRY BACKGROUND
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight

    const STAR_COUNT = 180
    const stars = []

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.5,
        baseX: 0,
        baseY: 0,
      })
    }

    stars.forEach(s => {
      s.baseX = s.x
      s.baseY = s.y
    })

    let mouse = { x: w / 2, y: h / 2 }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "white"

      stars.forEach(star => {
        const dx = mouse.x - star.baseX
        const dy = mouse.y - star.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          star.x = star.baseX - dx * 0.05
          star.y = star.baseY - dy * 0.05
        } else {
          star.x += (star.baseX - star.x) * 0.05
          star.y += (star.baseY - star.y) * 0.05
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    draw()

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setResult(null)
    setMask(null)
  }

  const handlePredict = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setResult(data)
    setMask(`data:image/png;base64,${data.mask_png}`)
    setLoading(false)
  }

  const badgeColor = (decision) => {
    if (decision === "OK") return "bg-ok"
    if (decision === "WARNING") return "bg-warning"
    return "bg-danger"
  }

  return (
    <>
      {/* 🌌 CANVAS BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="relative max-w-xl w-full space-y-6 text-center backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-gray-800 shadow-2xl">

          {/* ❓ USER GUIDE BUTTON */}
          <button
            onClick={() => setShowGuide(true)}
            className="absolute top-4 left-4 text-gray-400 hover:text-white transition text-xl"
            title="User Guide"
          >
            ?
          </button>

          {/* 🔄 RESET BUTTON */}
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-2xl"
            title="Reset"
          >
            ⟳
          </button>

          <h1 className="text-5xl font-extrabold tracking-tight
            bg-gradient-to-r from-white via-gray-200 to-gray-400
            bg-clip-text text-transparent">
            Visual Anomaly Intelligence
          </h1>

          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Deep Learning • Segmentation • Explainability
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-black
              hover:file:bg-gray-200"
          />

          {preview && (
            <div className="relative mx-auto w-fit">
              <img
                src={preview}
                className="rounded-xl max-h-64 object-contain"
              />
              {mask && showMask && (
                <img
                  src={mask}
                  style={{ opacity }}
                  className="absolute top-0 left-0 rounded-xl max-h-64 object-contain transition-opacity duration-300"
                />
              )}
            </div>
          )}

          {mask && (
            <>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Mask opacity</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => setShowMask(!showMask)}
                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                {showMask ? "Hide Mask" : "Show Mask"}
              </button>
            </>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Detect Anomaly"}
          </button>

          {result && (
            <div className="space-y-4">
              <div className={`inline-block px-5 py-2 rounded-full text-black font-bold ${badgeColor(result.decision)} animate-pulse`}>
                {result.decision}
              </div>
              <p className="text-gray-300">
                Severity Score: <span className="font-semibold">{result.severity_score}%</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 📘 USER GUIDE MODAL */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black/90 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 max-w-lg w-full text-left space-y-4">

            <h2 className="text-2xl font-bold text-white">
              How this app works
            </h2>

            <p className="text-gray-300 text-sm">
              <strong>Visual Anomaly Intelligence</strong> uses a deep learning
              segmentation model to detect and localize anomalies in images at
              the pixel level.
            </p>

            <ul className="text-gray-300 text-sm list-disc pl-5 space-y-2">
              <li>Upload an image for inspection</li>
              <li>The model learns normal patterns and flags deviations</li>
              <li>An anomaly mask highlights suspicious regions</li>
              <li>A severity score estimates anomaly intensity</li>
            </ul>

            <div className="text-gray-400 text-sm space-y-1">
              <p><strong>Decision labels:</strong></p>
              <p>OK — No significant anomaly detected</p>
              <p>WARNING — Minor or early-stage anomaly</p>
              <p>REJECT — High-confidence anomaly detected</p>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Got it
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
