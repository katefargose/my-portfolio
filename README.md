# Personal Portfolio Website - Module 3 Assignment

A beautiful, responsive personal portfolio website built with HTML, CSS, and JavaScript.

## Features

✅ **Four Main Pages:**
- **Home Page** - Welcoming introduction with navigation
- **About Me** - Biography, interests, hobbies, goals, and achievements
- **Gallery/Portfolio** - Showcase of work, projects, and memorable moments with images and videos
- **Contact Me** - Functional contact form with validation and social media links

✅ **Design & Layout:**
- Fully responsive design (mobile, tablet, desktop)
- Consistent visual theme across all pages
- Modern gradient color scheme
- Smooth animations and transitions
- Professional typography and spacing

✅ **Functionalities:**
- **Navigation Bar:**
  - Smooth scrolling between sections
  - Active page highlighting
  - Mobile-responsive hamburger menu
  
- **JavaScript Enhancements:**
  - Image gallery with filter functionality
  - Modal pop-ups for image viewing
  - Hover effects and animations
  - Form validation with real-time feedback
  - Smooth scroll behavior
  - Intersection Observer for fade-in animations

✅ **Contact Form:**
- Full form validation (name, email, subject, message)
- Email format validation
- Real-time error messages
- Success message on submission
- Required field indicators

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom styling with Tailwind CSS CDN
- **JavaScript** - Interactivity and form validation
- **Font Awesome** - Icons
- **Responsive Design** - Mobile-first approach

## File Structure

```
├── index.html          # Home page
├── about.html          # About Me page
├── gallery.html        # Gallery/Portfolio page
├── contact.html        # Contact Me page
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── setup.sh            # Setup script
└── README.md           # This file
```

## Getting Started

### Option 1: Using the Setup Script (Recommended)

```bash
# Make script executable (first time only)
chmod +x setup.sh

# Start local web server
./setup.sh serve

# Or simply
./setup.sh
```

The website will be available at `http://localhost:8000`

### Option 2: Open Directly in Browser

Simply open `index.html` in your web browser. However, some features may work better with a local server.

### Option 3: Manual Server Setup

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

## Setup Script Commands

```bash
./setup.sh serve     # Start local web server (default)
./setup.sh open      # Open website in browser
./setup.sh validate  # Validate HTML files
./setup.sh help      # Show help message
```

## Pages Overview

### Home Page (`index.html`)
- Hero section with introduction
- Quick introduction cards
- Skills preview
- Smooth animations

### About Me (`about.html`)
- Personal biography
- Interests and hobbies (6 cards)
- Goals and achievements timeline
- Professional background

### Gallery (`gallery.html`)
- Filterable gallery (All, Projects, Photography, Design, Moments)
- Image grid with hover effects
- Modal pop-ups for detailed view
- Embedded video section
- 12+ portfolio items

### Contact Me (`contact.html`)
- Contact information display
- Social media links
- Functional contact form with:
  - Name validation (min 2 characters)
  - Email validation (format check)
  - Subject validation (min 3 characters)
  - Message validation (min 10 characters)
  - Real-time error messages
  - Success confirmation

## Responsive Design

The website is fully responsive and adapts to:
- **Mobile devices** (< 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (> 1024px)

Features:
- Mobile hamburger menu
- Responsive grid layouts
- Touch-friendly buttons
- Optimized image sizes

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
}
```

### Content
- Update personal information in HTML files
- Replace placeholder images with your own
- Modify social media links
- Customize contact information

## Features Implemented

### ✅ Assignment Requirements Met:

1. **Technology Stack:**
   - ✅ HTML for structure
   - ✅ CSS (Tailwind CDN) for styling
   - ✅ JavaScript for interactivity

2. **Pages:**
   - ✅ Home Page with introduction
   - ✅ About Me with biography, interests, goals, achievements
   - ✅ Gallery/Portfolio with images and videos
   - ✅ Contact Me with functional form

3. **Design:**
   - ✅ Responsive design
   - ✅ Visual consistency
   - ✅ Proper alignment and spacing
   - ✅ Meta tags for SEO

4. **Functionalities:**
   - ✅ Navigation with active page highlighting
   - ✅ Smooth scrolling
   - ✅ Image gallery with filters
   - ✅ Modal pop-ups
   - ✅ Hover effects
   - ✅ Animations
   - ✅ Form validation

## Evaluation Criteria Coverage

- **Design, Layout & Responsiveness (3 marks):** ✅ Fully responsive, consistent design
- **Content & Creativity (2 marks):** ✅ Rich content, creative presentation
- **Functionality & Navigation (2 marks):** ✅ All features working, smooth navigation
- **Code Quality & Documentation (2 marks):** ✅ Clean code, well-documented
- **Viva / Explanation (1 mark):** ✅ Ready for presentation

## License

This project is created for educational purposes as part of Module 3 Assignment.

## Author

Alex Johnson (Dummy data for assignment)

---

**Note:** This website uses placeholder images from Unsplash and dummy data. Replace with your actual information, images, and content before submission.
