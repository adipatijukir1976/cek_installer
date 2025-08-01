export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    aplikasi: [
      {
        nama: "chapzee",
        deploy: "vercel",
        tipe: "https://",
        icon: "https://raw.githubusercontent.com/adipatijukir1976/puspamanga/refs/heads/main/icon.png",
        powered: "Powered by\nBojonegoro Developer",
        versionCode: 2,
        updateUrl: "https://installer-blond.vercel.app",
        message: "Update terbaru tersedia dengan fitur baru.\nDitambahkan fitur history dan bookmark"
      }
    ]
  });
}
