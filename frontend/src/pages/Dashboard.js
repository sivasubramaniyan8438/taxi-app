import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rides, setRides] = useState([]);
  const [booking, setBooking] = useState(false);
  const [msg, setMsg] = useState('');
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const res = await API.get('/rides');
      setRides(res.data.rides);
      const ongoing = res.data.rides.find(r => r.status === 'requested' || r.status === 'accepted');
      setActiveRide(ongoing || null);
    } catch (err) {
      console.error(err);
    }
  };

  const bookRide = async (e) => {
    e.preventDefault();
    if (!pickup || !destination) return;
    setBooking(true);
    setMsg('');
    try {
      await API.post('/rides', { pickup, destination });
      setMsg('✅ Ride booked! Driver is on the way.');
      setPickup('');
      setDestination('');
      fetchRides();
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.message || 'Booking failed'));
    } finally {
      setBooking(false);
    }
  };

  const cancelRide = async (id) => {
    try {
      await API.patch(`/rides/${id}/cancel`);
      fetchRides();
    } catch (err) {
      alert('Cannot cancel');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const statusColor = {
    requested: '#f59e0b',
    accepted: '#3b82f6',
    'in-progress': '#8b5cf6',
    completed: '#10b981',
    cancelled: '#ef4444'
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <div className="logo">🚖 RideGo</div>
        <div className="user-info">
          <span>👤 {user?.name}</span>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dash-body">

        {/* Book Ride */}
        <div className="card">
          <h3>📍 Book a Ride</h3>
          {activeRide && (
            <div className="active-ride-warning">
              ⚠️ You already have an active ride. Cancel it first to book a new one.
            </div>
          )}
          <form onSubmit={bookRide}>
            <div className="field">
              <label>Pickup Location</label>
              <input
                type="text"
                placeholder="Enter pickup point"
                value={pickup}
                onChange={e => setPickup(e.target.value)}
                disabled={!!activeRide}
                required
              />
            </div>
            <div className="field">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Where to go?"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                disabled={!!activeRide}
                required
              />
            </div>
            {msg && <div className={`msg ${msg.startsWith('✅') ? 'success' : 'error-msg'}`}>{msg}</div>}
            <button
              type="submit"
              className="btn-primary"
              disabled={booking || !!activeRide}
            >
              {booking ? 'Booking...' : '🚖 Book Now'}
            </button>
          </form>
        </div>

        {/* Active Ride */}
        {activeRide && (
          <div className="card active-ride">
            <h3>🟡 Active Ride</h3>
            <div className="ride-detail">
              <div><strong>From:</strong> {activeRide.pickup}</div>
              <div><strong>To:</strong> {activeRide.destination}</div>
              <div><strong>Fare:</strong> ₹{activeRide.fare}</div>
              <div><strong>Driver:</strong> {activeRide.driver.name} | {activeRide.driver.phone}</div>
              <div><strong>Vehicle:</strong> {activeRide.driver.vehicle}</div>
              <div className="status-badge" style={{ background: statusColor[activeRide.status] }}>
                {activeRide.status.toUpperCase()}
              </div>
            </div>
            <button className="btn-cancel" onClick={() => cancelRide(activeRide._id)}>
              Cancel Ride
            </button>
          </div>
        )}

        {/* Ride History */}
        <div className="card">
          <h3>🕘 Ride History</h3>
          {rides.length === 0 ? (
            <p className="empty-msg">No rides yet. Book your first ride!</p>
          ) : (
            <div className="rides-list">
              {rides.map(ride => (
                <div key={ride._id} className="ride-item">
                  <div className="ride-route">
                    <span>📍 {ride.pickup}</span>
                    <span className="arrow">→</span>
                    <span>🏁 {ride.destination}</span>
                  </div>
                  <div className="ride-meta">
                    <span>₹{ride.fare}</span>
                    <span
                      className="status-badge"
                      style={{ background: statusColor[ride.status] }}
                    >
                      {ride.status}
                    </span>
                    <span className="ride-date">
                      {new Date(ride.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
