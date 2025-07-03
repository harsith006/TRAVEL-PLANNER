import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pickyourtrail')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [String],
  highlights: [String],
  priceRange: { type: String, required: true },
  bestTimeToVisit: { type: String },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Destination',
    required: true 
  },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  gallery: [String],
  inclusions: [String],
  exclusions: [String],
  itinerary: [{
    day: Number,
    title: String,
    description: String,
    activities: [String]
  }],
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  package: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package',
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  travelers: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  packageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Package'
  },
  destinationId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Destination'
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', userSchema);
const Destination = mongoose.model('Destination', destinationSchema);
const Package = mongoose.model('Package', packageSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Review = mongoose.model('Review', reviewSchema);

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// User Routes
app.get('/api/users/me', authenticateUser, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  });
});

// Destination Routes
app.get('/api/destinations', async (req, res) => {
  try {
    const { region, search } = req.query;
    let query = {};
    
    if (region) {
      query.region = region;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ message: 'Server error fetching destinations' });
  }
});

app.get('/api/destinations/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ message: 'Server error fetching destination' });
  }
});

app.post('/api/destinations', authenticateUser, isAdmin, async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    console.error('Error creating destination:', error);
    res.status(500).json({ message: 'Server error creating destination' });
  }
});

app.put('/api/destinations/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json(destination);
  } catch (error) {
    console.error('Error updating destination:', error);
    res.status(500).json({ message: 'Server error updating destination' });
  }
});

app.delete('/api/destinations/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Error deleting destination:', error);
    res.status(500).json({ message: 'Server error deleting destination' });
  }
});

// Package Routes
app.get('/api/packages', async (req, res) => {
  try {
    const { destination, featured, minPrice, maxPrice, duration } = req.query;
    let query = {};
    
    if (destination) {
      query.destination = destination;
    }
    
    if (featured) {
      query.featured = featured === 'true';
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (duration) {
      query.duration = Number(duration);
    }
    
    const packages = await Package.find(query).populate('destination', 'name country');
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Server error fetching packages' });
  }
});

app.get('/api/packages/:id', async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id).populate('destination');
    
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(tourPackage);
  } catch (error) {
    console.error('Error fetching package:', error);
    res.status(500).json({ message: 'Server error fetching package' });
  }
});

app.post('/api/packages', authenticateUser, isAdmin, async (req, res) => {
  try {
    const tourPackage = new Package(req.body);
    await tourPackage.save();
    res.status(201).json(tourPackage);
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Server error creating package' });
  }
});

app.put('/api/packages/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const tourPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(tourPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ message: 'Server error updating package' });
  }
});

app.delete('/api/packages/:id', authenticateUser, isAdmin, async (req, res) => {
  try {
    const tourPackage = await Package.findByIdAndDelete(req.params.id);
    
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ message: 'Server error deleting package' });
  }
});

// Booking Routes
app.get('/api/bookings', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('package', 'name duration price image')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

app.get('/api/bookings/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('package')
      .populate('user', 'name email');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user or if the user is an admin
    if (booking.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Server error fetching booking' });
  }
});

app.post('/api/bookings', authenticateUser, async (req, res) => {
  try {
    const { packageId, startDate, endDate, travelers, specialRequests } = req.body;
    
    // Find the package
    const tourPackage = await Package.findById(packageId);
    if (!tourPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    // Calculate total price
    const totalPrice = tourPackage.price * travelers;
    
    // Create booking
    const booking = new Booking({
      user: req.user._id,
      package: packageId,
      startDate,
      endDate,
      travelers,
      totalPrice,
      specialRequests
    });
    
    await booking.save();
    
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

app.put('/api/bookings/:id/cancel', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    
    // Update booking status
    booking.status = 'cancelled';
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error cancelling booking' });
  }
});

// Review Routes
app.get('/api/reviews', async (req, res) => {
  try {
    const { packageId, destinationId } = req.query;
    let query = {};
    
    if (packageId) {
      query.packageId = packageId;
    }
    
    if (destinationId) {
      query.destinationId = destinationId;
    }
    
    const reviews = await Review.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
});

app.post('/api/reviews', authenticateUser, async (req, res) => {
  try {
    const { packageId, destinationId, rating, comment, images } = req.body;
    
    // Check if package or destination exists
    if (packageId) {
      const packageExists = await Package.findById(packageId);
      if (!packageExists) {
        return res.status(404).json({ message: 'Package not found' });
      }
    }
    
    if (destinationId) {
      const destinationExists = await Destination.findById(destinationId);
      if (!destinationExists) {
        return res.status(404).json({ message: 'Destination not found' });
      }
    }
    
    // Create review
    const review = new Review({
      user: req.user._id,
      packageId,
      destinationId,
      rating,
      comment,
      images
    });
    
    await review.save();
    
    // Update package or destination rating
    if (packageId) {
      await updatePackageRating(packageId);
    }
    
    if (destinationId) {
      await updateDestinationRating(destinationId);
    }
    
    res.status(201).json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error creating review' });
  }
});

// Helper function to update package rating
async function updatePackageRating(packageId) {
  const reviews = await Review.find({ packageId });
  
  if (reviews.length === 0) return;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  await Package.findByIdAndUpdate(packageId, {
    rating: averageRating,
    reviewCount: reviews.length
  });
}

// Helper function to update destination rating
async function updateDestinationRating(destinationId) {
  const reviews = await Review.find({ destinationId });
  
  if (reviews.length === 0) return;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  await Destination.findByIdAndUpdate(destinationId, {
    rating: averageRating,
    reviewCount: reviews.length
  });
}

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Get the directory name of the current module
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});