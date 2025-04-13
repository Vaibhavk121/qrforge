function LogoUploader({ qrData, setQrData }) {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setQrData({
          ...qrData,
          logo: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Logo Upload</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="w-full"
        />
        {qrData.logo && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <img
              src={qrData.logo}
              alt="Logo preview"
              className="w-24 h-24 object-contain border rounded"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LogoUploader