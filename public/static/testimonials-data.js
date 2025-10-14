// Student testimonials data
const testimonialsData = [
  {
    "name": "Ananya R.",
    "college": "VNR Vignana Jyothi",
    "quote": "The personalized mock interviews and detailed resume review helped me convert zero interviews into three amazing job offers. The trainers' guidance was invaluable!",
    "role": "Software Engineer",
    "company": "TCS",
    "rating": 5
  },
  {
    "name": "Ravi K.",
    "college": "Vasavi",
    "quote": "The training gave me the confidence and a clear roadmap to crack my interviews. The structured approach made all the difference in my preparation.",
    "role": "Analyst",
    "company": "Deloitte",
    "rating": 5
  },
  {
    "name": "Megha S.",
    "college": "CBIT",
    "quote": "The mock drills were exactly like real interviews. Thanks to Elite Campus, I cracked Infosys on the first attempt!",
    "role": "Associate",
    "company": "Infosys",
    "rating": 5
  },
  {
    "name": "Priya S.",
    "college": "Sreenidhi",
    "quote": "The structured curriculum and dedicated mentorship helped me land my dream job at Google. Best decision of my college life!",
    "role": "Software Developer",
    "company": "Google",
    "rating": 5
  },
  {
    "name": "Rohit M.",
    "college": "MGIT",
    "quote": "Their unique interview preparation strategy and industry insights helped me secure a Product Manager role at Amazon.",
    "role": "Product Manager",
    "company": "Amazon",
    "rating": 5
  },
  {
    "name": "Aisha K.",
    "college": "Anurag University",
    "quote": "I was struggling with technical interviews, but Elite Campus transformed my approach and helped me land at Microsoft!",
    "role": "Data Scientist",
    "company": "Microsoft",
    "rating": 5
  },
  {
    "name": "Vijay R.",
    "college": "KLU",
    "quote": "The personalized attention and career guidance were exceptional. Highly recommend for serious job seekers!",
    "role": "Systems Engineer",
    "company": "Accenture",
    "rating": 5
  },
  {
    "name": "Kavita D.",
    "college": "Vignan",
    "quote": "The preparation materials and mock interviews were spot-on. Cleared Cognizant with confidence thanks to Elite Campus!",
    "role": "Technology Analyst",
    "company": "Cognizant",
    "rating": 5
  },
  {
    "name": "Sandeep L.",
    "college": "Narayanamma",
    "quote": "Detailed feedback after each mock session helped me improve continuously. Got placed at Wipro with a great package!",
    "role": "Project Engineer",
    "company": "Wipro",
    "rating": 4
  },
  {
    "name": "Neha P.",
    "college": "Sidhartha",
    "quote": "Absolutely worth every penny! The training methodology is practical and result-oriented. Joined CTS with confidence!",
    "role": "Senior Analyst",
    "company": "CTS",
    "rating": 5
  },
  {
    "name": "Harshitha A.",
    "college": "VNR Vignana Jyothi",
    "quote": "The problem-solving techniques taught here are game-changers. Secured my role at LTIMindtree thanks to excellent guidance!",
    "role": "Senior Analyst",
    "company": "LTIMindtree",
    "rating": 5
  },
  {
    "name": "Rakesh V.",
    "college": "BITS Pilani",
    "quote": "I appreciated the focus on both technical and soft skills. The holistic approach helped me excel at IBM interviews!",
    "role": "Software Developer",
    "company": "IBM",
    "rating": 5
  },
  {
    "name": "Kiran G.",
    "college": "Vasavi",
    "quote": "The personalized feedback and continuous support made my job search journey smooth and successful at DXC!",
    "role": "Software Engineer",
    "company": "DXC Technology",
    "rating": 5
  },
  {
    "name": "Shreya F.",
    "college": "CBIT",
    "quote": "Their focus on real-world problem solving helped me stand out in Intel's rigorous interview process!",
    "role": "Embedded Engineer",
    "company": "Intel",
    "rating": 5
  },
  {
    "name": "Vivek D.",
    "college": "MGIT",
    "quote": "The technical depth and interview strategies were exceptional. Landed my dream role at Cisco!",
    "role": "Network Engineer",
    "company": "Cisco",
    "rating": 5
  },
  {
    "name": "Pooja N.",
    "college": "Sreenidhi",
    "quote": "The focused practice sessions and expert guidance helped me crack Oracle's challenging technical rounds!",
    "role": "Database Administrator",
    "company": "Oracle",
    "rating": 4
  },
  {
    "name": "Pranav C.",
    "college": "Anurag University",
    "quote": "Structured learning path and hands-on projects prepared me perfectly for my Frontend Engineer role at PhonePe!",
    "role": "Frontend Engineer",
    "company": "PhonePe",
    "rating": 5
  },
  {
    "name": "Lalitha E.",
    "college": "KLU",
    "quote": "The customized training approach addressed all my weaknesses. Extremely grateful for landing at Freshworks!",
    "role": "QA Engineer",
    "company": "Freshworks",
    "rating": 5
  },
  {
    "name": "Mahesh K.",
    "college": "Vignan",
    "quote": "Excellent resources and mentorship helped me transition into research. Now thriving at IBM Research!",
    "role": "Research Analyst",
    "company": "IBM Research",
    "rating": 5
  },
  {
    "name": "Ananya S.",
    "college": "Narayanamma",
    "quote": "The dedicated career counseling and interview prep were invaluable for my success at Dell Technologies!",
    "role": "Systems Analyst",
    "company": "Dell Technologies",
    "rating": 4
  },
  {
    "name": "Ravi K.",
    "college": "Sidhartha",
    "quote": "From self-doubt to confident professional - Elite Campus transformed my career journey. Now at Siemens!",
    "role": "Software Engineer",
    "company": "Siemens",
    "rating": 5
  },
  {
    "name": "Tarun V.",
    "college": "VNR Vignana Jyothi",
    "quote": "The comprehensive cloud computing modules prepared me perfectly for my role at Mindtree!",
    "role": "Cloud Administrator",
    "company": "Mindtree",
    "rating": 4
  },
  {
    "name": "Swati R.",
    "college": "CBIT",
    "quote": "Excellent platform for serious learners. The practical approach helped me excel at Persistent Systems!",
    "role": "Software Engineer",
    "company": "Persistent Systems",
    "rating": 5
  },
  {
    "name": "Monika J.",
    "college": "Vasavi",
    "quote": "The mock drills simulated real interview pressure perfectly. Cracked Wipro with flying colors!",
    "role": "Project Engineer",
    "company": "Wipro",
    "rating": 5
  },
  {
    "name": "Chandan M.",
    "college": "Sreenidhi",
    "quote": "Their preparation strategy for product-based companies is outstanding. Secured SDE Intern at Amazon!",
    "role": "SDE Intern",
    "company": "Amazon",
    "rating": 5
  },
  {
    "name": "Yash L.",
    "college": "BITS Hyderabad",
    "quote": "I attribute my success at Google to the rigorous training and continuous mentorship from Elite Campus!",
    "role": "Data Engineer",
    "company": "Google",
    "rating": 5
  },
  {
    "name": "Madhu V.",
    "college": "MGIT",
    "quote": "Fantastic guidance throughout my placement journey. The mock interviews built my confidence for Infosys!",
    "role": "Associate Consultant",
    "company": "Infosys",
    "rating": 4
  },
  {
    "name": "Suresh R.",
    "college": "Anurag University",
    "quote": "The resume optimization and LinkedIn strategy helped me get noticed by HCL Technologies!",
    "role": "Software Engineer",
    "company": "HCL Technologies",
    "rating": 5
  },
  {
    "name": "Deepika T.",
    "college": "KLU",
    "quote": "The Capgemini-specific preparation modules were incredibly helpful. Joined as a Consultant with confidence!",
    "role": "Consultant",
    "company": "Capgemini",
    "rating": 5
  },
  {
    "name": "Vikram P.",
    "college": "Vignan",
    "quote": "Mastered the tricks of system design interviews. Elite Campus made my Flipkart dream a reality!",
    "role": "Backend Developer",
    "company": "Flipkart",
    "rating": 5
  },
  {
    "name": "Anjali C.",
    "college": "Narayanamma",
    "quote": "The technical depth and analytics focus prepared me perfectly for my Data Analyst role at IBM!",
    "role": "Data Analyst",
    "company": "IBM",
    "rating": 5
  },
  {
    "name": "Ganesh K.",
    "college": "Sidhartha",
    "quote": "Highly recommended for anyone serious about placements. Got into Tech Mahindra with excellent support!",
    "role": "Systems Engineer",
    "company": "Tech Mahindra",
    "rating": 5
  },
  {
    "name": "Harini J.",
    "college": "VNR Vignana Jyothi",
    "quote": "Cleared the technical rounds at TCS with ease thanks to Elite Campus's comprehensive preparation!",
    "role": "Software Engineer",
    "company": "TCS",
    "rating": 5
  }
];
