//Data dummy dokter urologi
const dummyDoctors = [
    {
        id: "doc-1",
        name: "Dr. Budi Santoso, Sp.U",
        specialty: "Urologi",
        address: "Jl. Merdeka No. 10, Jakarta Pusat",
        city: "Jakarta",
        phone: "+62 812 3456 7891",
        email: "budi.santoso@example.com",
        availability: [
            { day: "Senin", time: "09:00 - 12:00" },
            { day: "Rabu", time: "14:00 - 17:00" }
        ]
    },
    {
        id: "doc-2",
        name: "Dr. Citra Dewi, Sp.U",
        specialty: "Urologi",
        address: "Jl. Sudirman No. 25, Jakarta Selatan",
        city: "Jakarta",
        phone: "+62 812 3456 7892",
        email: "citra.dewi@example.com",
        availability: [
            { day: "Selasa", time: "10:00 - 13:00" },
            { day: "Kamis", time: "15:00 - 18:00" }
        ]
    },
    {
        id: "doc-3",
        name: "Dr. Ahmad Fauzi, Sp.U",
        specialty: "Urologi",
        address: "Jl. Asia Afrika No. 50, Bandung",
        city: "Bandung",
        phone: "+62 812 3456 7893",
        email: "ahmad.fauzi@example.com",
        availability: [
            { day: "Senin", time: "10:00 - 13:00" },
            { day: "Jumat", time: "09:00 - 12:00" }
        ]
    },
    {
        id: "doc-4",
        name: "Dr. Maria Lestari, Sp.U",
        specialty: "Urologi",
        address: "Jl. Diponegoro No. 15, Surabaya",
        city: "Surabaya",
        phone: "+62 812 3456 7894",
        email: "maria.lestari@example.com",
        availability: [
            { day: "Rabu", time: "08:00 - 11:00" },
            { day: "Sabtu", time: "10:00 - 13:00" }
        ]
    }
];

export const getDoctorSchedules = (req, res) => {
    const { location } = req.query; // Dapatkan parameter lokasi dari query string

    let filteredDoctors = dummyDoctors;

    if (location) {
        const lowerCaseLocation = location.toLowerCase();
        filteredDoctors = dummyDoctors.filter(doctor =>
            doctor.city.toLowerCase().includes(lowerCaseLocation) ||
            doctor.address.toLowerCase().includes(lowerCaseLocation)
        );
    }

    if (filteredDoctors.length > 0) {
        res.status(200).json({
            message: "Jadwal dokter berhasil ditemukan.",
            doctors: filteredDoctors
        });
    } else {
        res.status(404).json({
            message: "Tidak ada dokter urologi yang ditemukan di lokasi tersebut.",
            doctors: []
        });
    }
};

// Fungsi untuk mendapatkan detail dokter berdasarkan ID (opsional, bisa digunakan untuk halaman detail dokter)
export const getDoctorDetail = (req, res) => {
    const { id } = req.params;
    const doctor = dummyDoctors.find(doc => doc.id === id);

    if (doctor) {
        res.status(200).json({ doctor });
    } else {
        res.status(404).json({ message: "Dokter tidak ditemukan." });
    }
};