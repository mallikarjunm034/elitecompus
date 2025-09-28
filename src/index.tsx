import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for API endpoints
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API endpoint for contact form submission
app.post('/api/contact', async (c) => {
  try {
    const { name, email, phone, message } = await c.req.json()
    
    // In production, integrate with email service or CRM
    console.log('Contact form submission:', { name, email, phone, message })
    
    return c.json({ 
      success: true, 
      message: 'Thank you! We will contact you within 24 hours.' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      message: 'Something went wrong. Please try again.' 
    }, 400)
  }
})

// API endpoint for syllabus PDF download
app.get('/api/syllabus-pdf', async (c) => {
  try {
    // Create a proper PDF with jsPDF-like structure
    // This is a minimal valid PDF that should work across browsers
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
  /Font <<
    /F1 4 0 R
  >>
>>
/MediaBox [0 0 612 792]
/Contents 5 0 R
>>
endobj

4 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

5 0 obj
<<
/Length 1200
>>
stream
BT
/F1 20 Tf
50 700 Td
(Elite Campus Training - Comprehensive Syllabus) Tj
0 -40 Td
/F1 16 Tf
(Get Placed in 90 Days - From Mock to Offer) Tj
0 -60 Td
/F1 14 Tf
(QUANTITATIVE APTITUDE:) Tj
0 -25 Td
/F1 12 Tf
(• Arithmetic & Number Systems) Tj
0 -20 Td
(• Profit & Loss, Discounts) Tj
0 -20 Td
(• Time, Speed & Work Problems) Tj
0 -20 Td
(• Probability & Combinations \\(P&C\\)) Tj
0 -20 Td
(• Ratios, Averages & Mixtures) Tj
0 -40 Td
/F1 14 Tf
(LOGICAL REASONING:) Tj
0 -25 Td
/F1 12 Tf
(• Puzzles & Seating Arrangements) Tj
0 -20 Td
(• Blood Relations & Coding-Decoding) Tj
0 -20 Td
(• Syllogisms & Series) Tj
0 -20 Td
(• Logical Deductions & Arguments) Tj
0 -40 Td
/F1 14 Tf
(DATA INTERPRETATION:) Tj
0 -25 Td
/F1 12 Tf
(• Bar, Line & Pie Charts) Tj
0 -20 Td
(• Tables & Data Sufficiency) Tj
0 -20 Td
(• Statistical Analysis) Tj
0 -40 Td
/F1 14 Tf
(SOFT SKILLS:) Tj
0 -25 Td
/F1 12 Tf
(• Communication & Confidence Building) Tj
0 -20 Td
(• Interview Etiquette & Professional Presentation) Tj
0 -40 Td
/F1 14 Tf
(CONTACT: Harish Kumar - +91 8438554420) Tj
0 -20 Td
/F1 12 Tf
(Email: harishpro24@gmail.com) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000079 00000 n 
0000000173 00000 n 
0000000301 00000 n 
0000000380 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
1630
%%EOF`

    // Convert to Uint8Array for proper PDF handling
    const encoder = new TextEncoder()
    const pdfBytes = encoder.encode(pdfContent)
    
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Elite-Campus-Training-Syllabus.pdf"',
        'Content-Length': pdfBytes.length.toString()
      }
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return c.json({ 
      success: false, 
      message: 'PDF generation failed' 
    }, 500)
  }
})

// Main landing page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Elite Campus Training - Get Placed in 90 Days | IIM/IIT Mentors</title>
        <meta name="description" content="Get placed in top companies like TCS, Deloitte, Infosys with our 90% placement success rate. Learn from IIM/IIT mentors. Book free mock interview now!">
        <meta name="keywords" content="placement training, mock interview, IIT IIM mentors, campus placement, job interview preparation">
        
        <!-- Open Graph tags for social sharing -->
        <meta property="og:title" content="Elite Campus Training - Get Placed in 90 Days">
        <meta property="og:description" content="Learn from IIM/IIT mentors & industry experts with a 90%+ placement success record.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://elite-campus-training.pages.dev">
        
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"></script>
        
        <!-- Font Awesome Icons -->
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
        
        <!-- Custom CSS -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <!-- Tailwind Config -->
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        fontFamily: {
                            'inter': ['Inter', 'sans-serif'],
                        },
                        colors: {
                            'primary': '#1e40af',
                            'secondary': '#0ea5e9',
                            'accent': '#f59e0b',
                            'success': '#10b981',
                            'dark': '#1e293b',
                        }
                    }
                }
            }
        </script>
    </head>
    <body class="font-inter bg-white">
        <!-- Navigation -->
        <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <h1 class="text-xl font-bold text-primary">Elite Campus Training</h1>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="#curriculum" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Curriculum</a>
                            <a href="#trainers" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Trainers</a>
                            <a href="#testimonials" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Success Stories</a>
                            <a href="#faq" class="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">FAQ</a>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="tel:+918438554420" class="text-primary hover:text-secondary transition-colors">
                            <i class="fas fa-phone mr-1"></i>
                            <span class="hidden sm:inline">Call Now</span>
                        </a>
                        <button onclick="openModal()" class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            Book Mock Interview
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="pt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div class="mb-6">
                            <span class="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                                <i class="fas fa-star mr-1"></i>
                                90%+ Placement Success Rate
                            </span>
                        </div>
                        <h1 class="text-4xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
                            Get Placed in 
                            <span class="text-primary">90 Days</span>
                            <br>
                            <span class="text-secondary">From Mock to Offer</span>
                        </h1>
                        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                            Learn from IIM/IIT mentors & industry experts with a 90%+ placement success record. 
                            Transform your career with personalized training and guaranteed results.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 mb-8">
                            <button onclick="openModal()" class="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                                <i class="fas fa-calendar-check mr-2"></i>
                                Book Your Free Mock Interview
                            </button>
                            <button onclick="downloadSyllabus()" class="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                                <i class="fas fa-download mr-2"></i>
                                Download Syllabus PDF
                            </button>
                        </div>
                        
                        <div class="flex items-center space-x-6">
                            <button onclick="playDemo()" class="flex items-center text-secondary hover:text-blue-700 transition-colors">
                                <div class="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-3">
                                    <i class="fas fa-play text-secondary"></i>
                                </div>
                                <span class="font-medium">Watch 2-min Demo</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
                            <div class="text-center">
                                <div class="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                                    <i class="fas fa-graduation-cap text-4xl text-white"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-dark mb-4">Success Guaranteed</h3>
                                <p class="text-gray-600 mb-6">Join 2000+ students who landed their dream jobs</p>
                                <div class="grid grid-cols-2 gap-4 text-center">
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-2xl font-bold text-primary">2000+</div>
                                        <div class="text-sm text-gray-600">Students Placed</div>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <div class="text-2xl font-bold text-success">8 LPA</div>
                                        <div class="text-sm text-gray-600">Average CTC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Decorative elements -->
                        <div class="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full"></div>
                        <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trust & Social Proof Section -->
        <section class="py-16 bg-white border-b">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Trusted Colleges -->
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-8">Trusted by India's Top Colleges</h2>
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">VNR Vignana Jyothi</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Vasavi</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Anurag University</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Narayanamma</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Srinidhi</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Vignan</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">KLU</div>
                        </div>
                        <div class="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div class="text-primary font-semibold text-sm">Sidhartha</div>
                        </div>
                    </div>
                </div>
                
                <!-- Company Logos -->
                <div class="text-center mb-12">
                    <h3 class="text-2xl font-bold text-dark mb-8">Our Students Work At</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-blue-600 font-bold text-lg">TCS</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-green-600 font-bold text-lg">Deloitte</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-blue-500 font-bold text-lg">Infosys</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-purple-600 font-bold text-lg">Accenture</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-blue-700 font-bold text-lg">Cognizant</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-orange-500 font-bold text-lg">Amazon</div>
                        </div>
                        <div class="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div class="text-blue-600 font-bold text-lg">Wipro</div>
                        </div>
                    </div>
                </div>

                <!-- Key Statistics -->
                <div class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
                    <div class="text-center mb-8">
                        <h3 class="text-3xl font-bold mb-2">Key Placement Statistics</h3>
                        <p class="text-blue-100">Proven track record of excellence</p>
                    </div>
                    <div class="grid md:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="text-4xl font-bold mb-2">2000+</div>
                            <div class="text-blue-100">Students Overall Placed</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-bold mb-2">8 LPA</div>
                            <div class="text-blue-100">Average CTC</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-bold mb-2">90%</div>
                            <div class="text-blue-100">Interview-to-Offer Rate</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-bold mb-2">2167+</div>
                            <div class="text-blue-100">Students Trained at VNR<br><span class="text-sm">(90-96% placement rate)</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Placement Journey Section -->
        <section class="py-16 bg-gray-50" id="journey">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-4">Your Placement Journey, Simplified</h2>
                    <p class="text-xl text-gray-600">A proven 4-step process that guarantees results</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Step 1 -->
                    <div class="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-file-alt text-primary text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-dark mb-4">Resume Overhaul</h3>
                        <p class="text-gray-600">ATS-ready resume + strong LinkedIn profile that gets noticed by recruiters</p>
                    </div>
                    
                    <!-- Step 2 -->
                    <div class="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div class="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-microphone text-secondary text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-dark mb-4">Mock Interviews</h3>
                        <p class="text-gray-600">Intensive practice sessions with IIT/IIM trainers to build confidence</p>
                    </div>
                    
                    <!-- Step 3 -->
                    <div class="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div class="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-project-diagram text-accent text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-dark mb-4">Capstone Projects</h3>
                        <p class="text-gray-600">Real-world project exposure that makes your resume stand out</p>
                    </div>
                    
                    <!-- Step 4 -->
                    <div class="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div class="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">4</div>
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-handshake text-success text-xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-dark mb-4">Final Placement</h3>
                        <p class="text-gray-600">Company-specific interview drills and guaranteed job placement</p>
                    </div>
                </div>
                
                <div class="text-center mt-12">
                    <button onclick="openModal()" class="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                        Start Your Journey Today
                    </button>
                </div>
            </div>
        </section>

        <!-- Curriculum Section -->
        <section class="py-16 bg-white" id="curriculum">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-4">Comprehensive Curriculum Highlights</h2>
                    <p class="text-xl text-gray-600">Industry-relevant skills that employers demand</p>
                </div>
                
                <div class="grid lg:grid-cols-2 gap-12">
                    <div class="space-y-8">
                        <!-- Quantitative Aptitude -->
                        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-calculator"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-dark">Quantitative Aptitude</h3>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Arithmetic</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Profit & Loss</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Time/Speed/Work</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Probability</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>P&C</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Number Systems</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Ratios</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Averages</div>
                                <div class="flex items-center"><i class="fas fa-check text-primary mr-2"></i>Mixtures</div>
                            </div>
                        </div>
                        
                        <!-- Logical Reasoning -->
                        <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-brain"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-dark">Logical Reasoning</h3>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Puzzles</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Seating Arrangements</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Blood Relations</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Coding-Decoding</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Syllogisms</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Series</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Logical Deductions</div>
                                <div class="flex items-center"><i class="fas fa-check text-purple-600 mr-2"></i>Statements & Arguments</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-8">
                        <!-- Data Interpretation -->
                        <div class="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-xl">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-dark">Data Interpretation</h3>
                            </div>
                            <div class="space-y-2 text-sm text-gray-700">
                                <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>Graphs (Bar, Line, Pie)</div>
                                <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>Tables</div>
                                <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>Data Sufficiency</div>
                                <div class="flex items-center"><i class="fas fa-check text-green-600 mr-2"></i>Advanced Analytics</div>
                            </div>
                        </div>
                        
                        <!-- Soft Skills -->
                        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl">
                            <div class="flex items-center mb-4">
                                <div class="w-12 h-12 bg-orange-600 text-white rounded-lg flex items-center justify-center mr-4">
                                    <i class="fas fa-comments"></i>
                                </div>
                                <h3 class="text-2xl font-bold text-dark">Soft Skills</h3>
                            </div>
                            <div class="space-y-2 text-sm text-gray-700">
                                <div class="flex items-center"><i class="fas fa-check text-orange-600 mr-2"></i>Communication Skills</div>
                                <div class="flex items-center"><i class="fas fa-check text-orange-600 mr-2"></i>Confidence Building</div>
                                <div class="flex items-center"><i class="fas fa-check text-orange-600 mr-2"></i>Interview Etiquette</div>
                                <div class="flex items-center"><i class="fas fa-check text-orange-600 mr-2"></i>Professional Presentation</div>
                            </div>
                        </div>
                        
                        <div class="bg-gray-900 text-white p-8 rounded-xl">
                            <h3 class="text-xl font-bold mb-4">Ready to Master These Skills?</h3>
                            <p class="text-gray-300 mb-6">Join thousands of successful students who transformed their careers with our proven curriculum.</p>
                            <button onclick="openModal()" class="bg-accent hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                                Get Started Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trainers Section -->
        <section class="py-16 bg-gray-50" id="trainers">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-4">Meet Your Expert Trainers</h2>
                    <p class="text-xl text-gray-600">Learn from the best minds in the industry</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Harish Kumar -->
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div class="p-8 text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="fas fa-user-tie text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-dark mb-2">Harish Kumar</h3>
                            <div class="text-primary font-semibold mb-4">Founder & CEO</div>
                            <div class="text-sm text-gray-600 space-y-2">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-graduation-cap text-primary mr-2"></i>
                                    VIT Vellore Alumnus
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-briefcase text-primary mr-2"></i>
                                    10+ Years Experience
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-star text-primary mr-2"></i>
                                    Entrepreneur & Consultant
                                </div>
                            </div>
                            <p class="text-gray-600 mt-4 text-sm">
                                Soft skills & Life skills trainer specializing in interview preparation and career guidance.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Lakshmi -->
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div class="p-8 text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="fas fa-user-graduate text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-dark mb-2">Lakshmi</h3>
                            <div class="text-purple-600 font-semibold mb-4">Quant & Reasoning Expert</div>
                            <div class="text-sm text-gray-600 space-y-2">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-graduation-cap text-purple-600 mr-2"></i>
                                    IIM Rohtak (2019-2021)
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-trophy text-purple-600 mr-2"></i>
                                    99.6 in QA Score
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-medal text-purple-600 mr-2"></i>
                                    98.4 in LR Score
                                </div>
                            </div>
                            <p class="text-gray-600 mt-4 text-sm">
                                Quantitative Aptitude and Logical Reasoning specialist with proven track record in competitive exams.
                            </p>
                        </div>
                    </div>
                    
                    <!-- Other Trainers -->
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div class="p-8 text-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-green-600 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="fas fa-users text-3xl text-white"></i>
                            </div>
                            <h3 class="text-xl font-bold text-dark mb-2">Expert Panel</h3>
                            <div class="text-green-600 font-semibold mb-4">Industry Specialists</div>
                            <div class="text-sm text-gray-600 space-y-2">
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-university text-green-600 mr-2"></i>
                                    IIT/IIM Alumni
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-building text-green-600 mr-2"></i>
                                    VIT, SRM, Kumara Guru
                                </div>
                                <div class="flex items-center justify-center">
                                    <i class="fas fa-laptop-code text-green-600 mr-2"></i>
                                    Tier-1 Product Companies
                                </div>
                            </div>
                            <p class="text-gray-600 mt-4 text-sm">
                                Our diverse panel of experts from top institutions and leading tech companies brings real-world experience.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-12">
                    <div class="bg-primary/10 border border-primary/20 rounded-xl p-8 max-w-2xl mx-auto">
                        <h3 class="text-2xl font-bold text-dark mb-4">Why Our Trainers Make the Difference</h3>
                        <div class="grid md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div class="text-2xl font-bold text-primary mb-2">10+</div>
                                <div class="text-sm text-gray-600">Years Experience</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-primary mb-2">2000+</div>
                                <div class="text-sm text-gray-600">Students Trained</div>
                            </div>
                            <div>
                                <div class="text-2xl font-bold text-primary mb-2">90%+</div>
                                <div class="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="py-16 bg-white" id="testimonials">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-4">Student Success Stories</h2>
                    <p class="text-xl text-gray-600">Real results from real students</p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Testimonial 1 -->
                    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-dark">Ananya R.</h4>
                                <div class="text-sm text-gray-600">NIT Trichy</div>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6 italic">
                            "The personalized mocks & resume review converted my 0 interviews into 3 offers."
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="text-sm">
                                <div class="font-semibold text-primary">Software Engineer</div>
                                <div class="text-gray-600">TCS</div>
                            </div>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Testimonial 2 -->
                    <div class="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-xl">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-dark">Ravi K.</h4>
                                <div class="text-sm text-gray-600">Vasavi</div>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6 italic">
                            "The training gave me interview confidence and a clear roadmap."
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="text-sm">
                                <div class="font-semibold text-green-600">Analyst</div>
                                <div class="text-gray-600">Deloitte</div>
                            </div>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Testimonial 3 -->
                    <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
                        <div class="flex items-center mb-6">
                            <div class="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4">
                                <i class="fas fa-quote-left"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-dark">Megha S.</h4>
                                <div class="text-sm text-gray-600">VNR</div>
                            </div>
                        </div>
                        <p class="text-gray-700 mb-6 italic">
                            "The mock drills were exactly like real interviews - I cracked Infosys on the 1st attempt."
                        </p>
                        <div class="flex items-center justify-between">
                            <div class="text-sm">
                                <div class="font-semibold text-purple-600">Associate</div>
                                <div class="text-gray-600">Infosys</div>
                            </div>
                            <div class="flex text-yellow-400">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center mt-12">
                    <div class="bg-gray-900 text-white p-8 rounded-xl max-w-4xl mx-auto">
                        <h3 class="text-2xl font-bold mb-4">Join Our Success Community</h3>
                        <p class="text-gray-300 mb-6">Be the next success story. Our proven methodology has helped thousands of students achieve their career goals.</p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onclick="openModal()" class="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                                Start Your Success Journey
                            </button>
                            <button onclick="scrollToTestimonials()" class="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                                Read More Stories
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 bg-gray-50" id="faq">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
                    <p class="text-xl text-gray-600">Get answers to your most important questions</p>
                </div>
                
                <div class="space-y-6">
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onclick="toggleFAQ(1)" class="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-dark">I don't know coding. Is this for me?</h3>
                                <i class="fas fa-chevron-down text-gray-400 transition-transform" id="icon-1"></i>
                            </div>
                        </button>
                        <div class="px-6 pb-6 hidden" id="answer-1">
                            <p class="text-gray-600">Yes! We cover both coding and non-coding roles. Our curriculum is designed to prepare you for various opportunities in the tech industry, regardless of your coding background. We focus on aptitude, reasoning, and soft skills that are essential for all roles.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onclick="toggleFAQ(2)" class="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-dark">How is this different from my college training?</h3>
                                <i class="fas fa-chevron-down text-gray-400 transition-transform" id="icon-2"></i>
                            </div>
                        </button>
                        <div class="px-6 pb-6 hidden" id="answer-2">
                            <p class="text-gray-600">You'll get personalized mentorship plus mock interviews with IIT/IIM experts. Our training is more intensive, individualized, and industry-focused compared to general college programs. We provide one-on-one guidance and company-specific preparation.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onclick="toggleFAQ(3)" class="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-dark">What if I don't get placed?</h3>
                                <i class="fas fa-chevron-down text-gray-400 transition-transform" id="icon-3"></i>
                            </div>
                        </button>
                        <div class="px-6 pb-6 hidden" id="answer-3">
                            <p class="text-gray-600">We provide continuous support with multiple interview drills until you succeed. Our commitment doesn't end after the training - we work with you until you land your dream job. With our 90% placement rate, we're confident in our ability to help you succeed.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onclick="toggleFAQ(4)" class="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-dark">How long does the training program take?</h3>
                                <i class="fas fa-chevron-down text-gray-400 transition-transform" id="icon-4"></i>
                            </div>
                        </button>
                        <div class="px-6 pb-6 hidden" id="answer-4">
                            <p class="text-gray-600">Our intensive training program is designed to get you placement-ready in 90 days. This includes resume building, skill development, mock interviews, and placement preparation. The timeline may vary based on your starting level and dedication.</p>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                        <button onclick="toggleFAQ(5)" class="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors">
                            <div class="flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-dark">What companies do you help students get placed in?</h3>
                                <i class="fas fa-chevron-down text-gray-400 transition-transform" id="icon-5"></i>
                            </div>
                        </button>
                        <div class="px-6 pb-6 hidden" id="answer-5">
                            <p class="text-gray-600">Our students have been successfully placed in top companies including TCS, Deloitte, Infosys, Accenture, Cognizant, Amazon, and Wipro. We prepare you for both service-based and product-based companies across various roles and domains.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA Section -->
        <section class="py-16 bg-gradient-to-r from-primary to-secondary text-white">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-6">Your Success Story Starts Here</h2>
                <p class="text-xl text-blue-100 mb-8">
                    Don't let another opportunity pass by. Join thousands of successful students who transformed their careers with our proven training program.
                </p>
                
                <div class="mb-8">
                    <button onclick="openModal()" class="bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-lg">
                        <i class="fas fa-calendar-check mr-3"></i>
                        Book Your Free Mock Interview
                    </button>
                </div>
                
                <p class="text-sm text-blue-200">
                    <i class="fas fa-shield-alt mr-2"></i>
                    No spam. We'll only call once to schedule your session.
                </p>
                
                <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <div class="text-3xl font-bold mb-2">90%</div>
                        <div class="text-blue-200">Success Rate</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <div class="text-3xl font-bold mb-2">2000+</div>
                        <div class="text-blue-200">Students Placed</div>
                    </div>
                    <div class="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                        <div class="text-3xl font-bold mb-2">8 LPA</div>
                        <div class="text-blue-200">Average Package</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-4 gap-8">
                    <div class="md:col-span-2">
                        <h3 class="text-2xl font-bold mb-4">Elite Campus Training</h3>
                        <p class="text-gray-400 mb-6">
                            Transforming careers through expert guidance and proven methodologies. 
                            Your success is our commitment.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="bg-primary hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="bg-primary hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#" class="bg-primary hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                            <a href="#" class="bg-primary hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                                <i class="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="#curriculum" class="text-gray-400 hover:text-white transition-colors">Curriculum</a></li>
                            <li><a href="#trainers" class="text-gray-400 hover:text-white transition-colors">Trainers</a></li>
                            <li><a href="#testimonials" class="text-gray-400 hover:text-white transition-colors">Success Stories</a></li>
                            <li><a href="#faq" class="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Contact Info</h4>
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <i class="fas fa-user-tie text-primary mr-3"></i>
                                <div>
                                    <div class="font-semibold">Harish Kumar (CEO)</div>
                                    <div class="text-gray-400 text-sm">Founder</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-phone text-primary mr-3"></i>
                                <a href="tel:+918438554420" class="text-gray-400 hover:text-white transition-colors">
                                    +91 8438554420
                                </a>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-envelope text-primary mr-3"></i>
                                <a href="mailto:harishpro24@gmail.com" class="text-gray-400 hover:text-white transition-colors">
                                    harishpro24@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div class="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2024 Elite Campus Training. All rights reserved.
                    </div>
                    <div class="flex space-x-6 text-sm">
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>

        <!-- WhatsApp Float Button -->
        <a href="https://wa.me/918438554420" target="_blank" class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-50">
            <i class="fab fa-whatsapp text-2xl"></i>
        </a>

        <!-- Modal -->
        <div id="contactModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-xl max-w-md w-full p-8 relative">
                    <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    
                    <h2 class="text-2xl font-bold text-dark mb-6">Book Your Free Mock Interview</h2>
                    
                    <form id="contactForm" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                            <input type="text" id="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input type="email" id="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                            <input type="tel" id="phone" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">College/University</label>
                            <input type="text" id="college" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                            <textarea id="message" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell us about your career goals..."></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-primary hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                            Schedule Free Mock Interview
                        </button>
                    </form>
                    
                    <p class="text-xs text-gray-500 text-center mt-4">
                        We'll call you within 24 hours to schedule your session.
                    </p>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div id="successMessage" class="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 hidden">
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>Thank you! We'll contact you soon.</span>
            </div>
        </div>

        <!-- JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

export default app
