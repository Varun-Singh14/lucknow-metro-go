export interface Station {
  id: string;
  name: string;
  status: 'open' | 'closed';
}

export interface User {
  id: string;
  name: string;
  phone: string;
  profilePhoto?: string;
}

export interface Booking {
  id: string;
  userId: string;
  fromStation: Station;
  toStation: Station;
  passengers: number;
  amount: number;
  bookingDate: Date;
  validTill: Date;
  status: 'active' | 'expired' | 'used';
  transactionId: string;
  paymentProvider: string;
  qrCodes: string[];
}

export const STATIONS: Station[] = [
  { id: "ccs-airport", name: "CCS AIRPORT", status: "open" },
  { id: "amausi", name: "AMAUSI", status: "open" },
  { id: "transport-nagar", name: "TRANSPORT NAGAR", status: "open" },
  { id: "krishna-nagar", name: "KRISHNA NAGAR", status: "open" },
  { id: "singar-nagar", name: "SINGAR NAGAR", status: "open" },
  { id: "alambagh", name: "ALAMBAGH", status: "open" },
  { id: "alambagh-bus-stand", name: "ALAMBAGH BUS STAND", status: "open" },
  { id: "mawaiya", name: "MAWAIYA", status: "open" },
  { id: "durgapuri", name: "DURGAPURI", status: "open" },
  { id: "charbagh", name: "CHARBAGH", status: "open" },
  { id: "hussainganj", name: "HUSSAINGANJ", status: "open" },
  { id: "sachivalaya", name: "SACHIVALAYA", status: "open" },
  { id: "hazratganj", name: "HAZRATGANJ", status: "open" },
  { id: "kd-singh-babu-stadium", name: "KD SINGH BABU STADIUM", status: "open" },
  { id: "vishvavidyalaya", name: "VISHVAVIDYALAYA", status: "open" },
  { id: "it-college", name: "IT COLLEGE", status: "open" },
  { id: "badshah-nagar", name: "BADSHAH NAGAR", status: "open" },
  { id: "lekhraj-market", name: "LEKHRAJ MARKET", status: "open" },
  { id: "bhootnath-market", name: "BHOOTNATH MARKET", status: "open" },
  { id: "indira-nagar", name: "INDIRA NAGAR", status: "open" },
  { id: "munshipulia", name: "MUNSHIPULIA", status: "open" }
];

// Demo user
export const DEMO_USER: User = {
  id: "demo123",
  name: "Rahul Kumar",
  phone: "+91 9876543210",
  profilePhoto: undefined
};

// Demo login credentials
export const DEMO_CREDENTIALS = {
  id: "demo123",
  password: "password123"
};

// Calculate fare based on number of stations
export const calculateFare = (fromStationId: string, toStationId: string, passengers: number): number => {
  const fromIndex = STATIONS.findIndex(s => s.id === fromStationId);
  const toIndex = STATIONS.findIndex(s => s.id === toStationId);
  
  if (fromIndex === -1 || toIndex === -1) return 0;
  
  const stationDistance = Math.abs(toIndex - fromIndex);
  let baseFare = 10; // Base fare ₹10
  
  if (stationDistance <= 3) baseFare = 10;
  else if (stationDistance <= 6) baseFare = 15;
  else if (stationDistance <= 10) baseFare = 20;
  else baseFare = 25;
  
  return baseFare * passengers;
};

// Generate QR code data
export const generateQRCode = (bookingId: string, passengerIndex: number): string => {
  return `LUCKNOW_METRO_${bookingId}_P${passengerIndex + 1}`;
};

// Demo bookings
export const createDemoBookings = (): Booking[] => {
  const now = new Date();
  const validTill1 = new Date(now.getTime() + 12 * 60 * 60 * 1000); // 12 hours from now
  const validTill2 = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago (expired)
  
  return [
    {
      id: "booking_001",
      userId: DEMO_USER.id,
      fromStation: STATIONS[4], // SINGAR NAGAR
      toStation: STATIONS[12], // HAZRATGANJ
      passengers: 2,
      amount: 30,
      bookingDate: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
      validTill: validTill1,
      status: 'active',
      transactionId: "TXN123456789",
      paymentProvider: "GPay",
      qrCodes: [
        generateQRCode("booking_001", 0),
        generateQRCode("booking_001", 1)
      ]
    },
    {
      id: "booking_002",
      userId: DEMO_USER.id,
      fromStation: STATIONS[0], // CCS AIRPORT
      toStation: STATIONS[9], // CHARBAGH
      passengers: 1,
      amount: 20,
      bookingDate: new Date(now.getTime() - 26 * 60 * 60 * 1000), // 26 hours ago
      validTill: validTill2,
      status: 'expired',
      transactionId: "TXN987654321",
      paymentProvider: "PhonePe",
      qrCodes: [
        generateQRCode("booking_002", 0)
      ]
    }
  ];
};