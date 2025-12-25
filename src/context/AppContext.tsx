import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: 'student' | 'admin';
}

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  contactNumber: string;
  department: string;
  academicYear: string;
  amount: number;
  transactionId: string;
  paymentDate: string;
  courseName: string;
  receiptFile: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dateSubmitted: string;
}

interface AppContextType {
  user: User | null;
  payments: Payment[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, studentId: string) => boolean;
  submitPayment: (payment: Omit<Payment, 'id' | 'dateSubmitted'>) => void;
  approvePayment: (id: string) => void;
  rejectPayment: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Demo accounts
const DEMO_ACCOUNTS = [
  {
    id: '1',
    name: 'Chan Sotheara',
    email: 'student@rupp.edu.kh',
    password: 'student123',
    studentId: '102938',
    role: 'student' as const,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@rupp.edu.kh',
    password: 'admin123',
    role: 'admin' as const,
  },
];

// Initial demo payments
const INITIAL_PAYMENTS: Payment[] = [
  {
    id: '1',
    studentId: '102938',
    studentName: 'Chan Sotheara',
    contactNumber: '012 345 678',
    department: 'Computer Science',
    academicYear: 'Year 2 - Semester 1',
    amount: 450,
    transactionId: 'TXN-001',
    paymentDate: '2024-03-10',
    courseName: 'Computer Science 101',
    receiptFile: 'receipt-001.pdf',
    status: 'Approved',
    dateSubmitted: '2024-03-10',
  },
  {
    id: '2',
    studentId: '102938',
    studentName: 'Chan Sotheara',
    contactNumber: '012 345 678',
    department: 'Computer Science',
    academicYear: 'Year 2 - Semester 1',
    amount: 450,
    transactionId: 'TXN-002',
    paymentDate: '2024-02-15',
    courseName: 'Data Structures',
    receiptFile: 'receipt-002.pdf',
    status: 'Pending',
    dateSubmitted: '2024-02-15',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [accounts, setAccounts] = useState(DEMO_ACCOUNTS);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedPayments = localStorage.getItem('payments');
    const savedAccounts = localStorage.getItem('accounts');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      setPayments(INITIAL_PAYMENTS);
      localStorage.setItem('payments', JSON.stringify(INITIAL_PAYMENTS));
    }
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      localStorage.setItem('accounts', JSON.stringify(DEMO_ACCOUNTS));
    }
  }, []);

  // Save payments to localStorage whenever they change
  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem('payments', JSON.stringify(payments));
    }
  }, [payments]);

  const login = (email: string, password: string): boolean => {
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      const loggedInUser: User = {
        id: account.id,
        name: account.name,
        email: account.email,
        studentId: account.studentId,
        role: account.role,
      };
      setUser(loggedInUser);
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (
    name: string,
    email: string,
    password: string,
    studentId: string
  ): boolean => {
    // Check if email already exists
    if (accounts.some((acc) => acc.email === email)) {
      return false;
    }

    const newAccount = {
      id: Date.now().toString(),
      name,
      email,
      password,
      studentId,
      role: 'student' as const,
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));

    // Auto login after registration
    const newUser: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      studentId: newAccount.studentId,
      role: newAccount.role,
    };
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return true;
  };

  const submitPayment = (payment: Omit<Payment, 'id' | 'dateSubmitted'>) => {
    const newPayment: Payment = {
      ...payment,
      id: Date.now().toString(),
      dateSubmitted: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    setPayments([...payments, newPayment]);
  };

  const approvePayment = (id: string) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: 'Approved' as const } : payment
      )
    );
  };

  const rejectPayment = (id: string) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: 'Rejected' as const } : payment
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        payments,
        login,
        logout,
        register,
        submitPayment,
        approvePayment,
        rejectPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
