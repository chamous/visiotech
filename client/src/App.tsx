import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-[80px]"> {/* Add padding-top equal to header height */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;