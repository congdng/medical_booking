export const menuList = {
  "/": { name: "Home" },
  "/services": {
    name: "Medical Services",
    submenu: {
      "/services/medical-specialties": {
        name: "Medical Specialties",
        route: "medicalspecialties",
        subsubmenu: {
          "/services/medical-specialties/accident-emergency":
            "Accident & Emergency",
          "/services/medical-specialties/rheumatology": "Rheumatology",
          "/services/medical-specialties/pain-clinic": "Pain Clinic",
        },
      },
      "/services/surgical-specialties": {
        name: "Surgical Specialties",
        route: "surgicalspecialties",
        subsubmenu: {
          "/services/surgical-specialties/general-surgery": "General Surgery",
          "/services/surgical-specialties/bone": "Bone",
        },
      },
      "/services/support-services": {
        name: "Support Services",
        route: "supportservices",
        subsubmenu: {
          "/services/support-services/diagnostic-imaging": "Diagnostic Imaging",
          "/services/support-services/pharmacy": "Pharmacy",
          "/services/support-services/laboratory-blood-bank":
            "Laboratory & Blood Bank",
          "/services/support-services/physiotherapy-rehabilitation":
            "Physiotherapy & Rehabilitation",
        },
      },
    },
  },
  "/patient-guide": {
    name: "Patient Guide",
    submenu: {
      "/patient-guide/consultation": {
        name: "Consultation",
      },
      "/patient-guide/pricing-policy": {
        name: "Pricing Policy",
      },
      "/patient-guide/room-rates": {
        name: "Room Rates",
      },
      "/patient-guide/online-package": {
        name: "Online Package",
      },
    },
  },
  "/find-doctor": {
    name: "Find A Doctor",
  },
  "/about-us": {
    name: "About Us",
    submenu: {
      "/about-us/overview": {
        name: "Overview",
      },
      "/about-us/our-philosophy": {
        name: "Our Philosophy",
      },
      "/about-us/facilities": {
        name: "Facilities",
      },
      "/about-us/patient-rights-responsibilities": {
        name: "Patient Rights & Responsibilities",
      },
      "/about-us/personal-protection": {
        name: "Personal Data Protection Statement",
      },
      "/about-us/contact": {
        name: "Contact",
      },
    },
  },
  "/insurance": {
    name: "Insurance Services",
  },
  "/contact": {
    name: "Contact Us",
    submenu: {
      "/contact/": {
        name: "Hospital Contact Information",
      },
      "/contact/general-inquiry": { name: "General Inquiry" },
      "/contact/complaint": { name: "Complaints and Grievances" },
      "/bookingdoctor": { name: "Make An Appointment" },
    },
  },
};

export const languageList = [
  {
    name: "English",
    ISO: "US",
  },
  {
    name: "Vietnamese",
    ISO: "VN",
  },
];

export const contactNumber = [
  {
    name: "Emergency",
    phoneNumber: "+8483058190",
  },
  {
    name: "Contact Us",
    phoneNumber: "+8407502938",
  },
];

export const mainNavigation = [
  {
    name: "Find A Doctor",
    url: "./findadoctor",
    icon: "fa-solid fa-user-doctor",
  },
  {
    name: "Make An Appointment",
    url: "./makeanappointment",
    icon: "fa-solid fa-calendar-check",
  },
  {
    name: "Insurance Services",
    url: "./insurance",
    icon: "fa-solid fa-money-bill",
  },
  {
    name: "Send A Feedback",
    url: "./sendfeedback",
    icon: "fa-solid fa-comment",
  },
];

export const departmentList = [
  {
    name: "Accident & Emergency",
    description: `
  Accident and Emergency (A&E) is a medical specialty focused on the treatment of urgent and emergent conditions. A&E teams typically include a combination of specialists from various medical disciplines, including internal medicine, surgery, anesthesiology, pediatrics, emergency medicine, and nursing.
  In a typical A&E setting, patients with acute and emergent medical conditions are evaluated, stabilized, and treated. These conditions can include severe infections, fractures, dislocations, spinal cord injuries, poisonings, burns, traumatic brain injuries, heart attacks, and other life-threatening situations.
  The process of evaluating and treating these patients can be complex and time-sensitive. This requires the expertise of medical professionals who are highly trained in their respective fields and have the ability to work collaboratively as a team.
  It is important to note that A&E services are usually available 24 hours a day, 7 days a week. This ensures that patients who are experiencing acute or emergent conditions can receive the immediate attention they need, regardless of the time.
  
  Some of the common reasons why people might seek treatment in an A&E department include:
  - Chest pain or shortness of breath
  - Difficulty breathing or wheezing
  - Fainting or loss of consciousness
  - Severe headaches
  - Seizures or convulsions
  - Nausea and vomiting, especially if accompanied by other symptoms
  - Accidents or injuries
  - Suspected poisoning or exposure to hazardous materials
  - Allergic reactions
  - Behavioral emergencies, such as self-harm or agitation
  
  Overall, A&E services play a crucial role in providing comprehensive, specialized care to patients with urgent and emergent medical conditions. These services are often a lifeline for those in need and ensure that patients receive the expert treatment they require.`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Nurse_prioritizing_injured_patients_at_A%26E_Department.jpg",
  },
  {
    name: "Rheumatology",
    description: `
  Rheumatology is a medical specialty that focuses on diagnosing and treating diseases and conditions that affect the musculoskeletal system. These conditions often involve inflammation and may include arthritis, fibromyalgia, lupus, and various types of connective tissue disorders.
  Rheumatologists are physicians who specialize in rheumatology. They have completed an additional residency after completing their medical degree, specifically focusing on rheumatology. They have a deep understanding of the conditions they treat and the various treatments available.
  
  Treatment for rheumatologic conditions often involves a combination of approaches, such as:
  Medications: These may include pain relievers, anti-inflammatory drugs, corticosteroids, and biologic therapies like tumor necrosis factor (TNF) inhibitors and anti-IL-6 monoclonal antibodies.
  Physical therapy: This may involve exercise, strengthening, and rehabilitation programs to improve flexibility, strength, and range of motion.
  Occupational therapy: This focuses on assisting individuals in regaining their ability to perform daily activities, work, and other functional tasks.
  Injections: These may involve the use of corticosteroids or hyaluronic acid to reduce inflammation and improve joint function.
  Surgery: In some cases, surgery may be necessary to address the underlying cause of the rheumatologic condition, such as correcting bone deformities in cases of osteoarthritis or repairing joint damage in cases of rheumatoid arthritis.
  It is important to note that each rheumatologic condition is unique, and the most effective treatment approach may vary depending on the individual patient and their specific needs. Early diagnosis and treatment are crucial in managing these conditions, as timely intervention can significantly impact a patient's overall health and quality of life.
  To help ensure accurate diagnosis and appropriate treatment, it is essential for patients to work closely with their rheumatologist. This includes being open and honest about any symptoms or concerns and participating in a thorough evaluation to determine the most effective treatment plan.
  By maintaining a comprehensive understanding of rheumatologic conditions and their treatment options, rheumatologists can help their patients achieve the best possible outcomes and enjoy improved health and well-being.
  `,
    image: "https://www.atlanticare.org/assets/images/services/rheum/gout.jpg",
  },
  {
    name: "Pain Clinic",
    description:
      "A pain clinic is a specialized medical facility where patients can receive expert, interdisciplinary pain management and treatment. Staffed by a team of healthcare professionals, including medical doctors, physical therapists, occupational therapists, psychologists, and nurse practitioners, the clinic uses a comprehensive approach to identify and address the underlying causes of pain, while also providing patients with the necessary tools and strategies to manage their pain effectively. The clinic may offer services such as evaluating the patient's medical history, recommending appropriate medications, providing individualized exercise programs, and developing personalized pain management plans. By providing a multidisciplinary approach to pain management, pain clinics can help patients regain their quality of life and achieve improved pain control.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Pain_clinic_patient_interaction.jpg/800px-Pain_clinic_patient_interaction.jpg",
  },
  {
    name: "General Surgery",
    description: `
  General surgery is a medical specialty that deals with the diagnosis and treatment of disorders related to the surgical management of body parts, as well as the organs of the human body. The procedures involved may require the use of anesthesia and invasive techniques, and often require the expertise of specialists in other medical fields.
  Examples of common procedures in general surgery include:
  - Appendicectomy: Surgical removal of the appendix.
  - Hysterectomy: Surgical removal of the uterus.
  - Certain types of surgeries to correct birth defects, such as congenital heart surgery.
  - Gallbladder surgery, including removal or removal and reconstruction of the gallbladder.
  - Kidney and urinary tract surgery, including procedures to treat kidney stones and renal cell carcinoma.
  - Colon and rectal surgery, including removal of cancerous tissue, inflammatory bowel disease management, and colorectal surgeries to prevent and treat cancer.
  - Cardiothoracic surgery, which involves the surgical management of the heart and lungs.
  - Trauma and orthopedic surgery, including procedures to treat fractures, dislocations, and spinal injuries.
  - Surgical management of certain gastrointestinal disorders, such as inflammatory bowel disease, diverticulitis, and liver diseases.
  - Bariatric surgery, including weight loss surgeries like gastric bypass and gastric banding.`,
    image:
      "https://media.wired.com/photos/5b196744b1f81b0d5624169f/master/w_1600%2Cc_limit/iPhoneSurgery-2012.jpg",
  },
  {
    name: "Bone & Joint Centre",
    description: `
  Bone & Joint Centre (BJC) is a state-of-the-art hospital dedicated to providing expert and comprehensive treatment for all bone and joint conditions. We are committed to improving the lives of our patients by offering cutting-edge treatments and personalized care. Our experienced and highly skilled team of medical professionals, including orthopaedic surgeons, orthopaedic trauma surgeons, sports medicine specialists, rheumatologists, and physical therapists, work together to provide comprehensive care for every patient.
  The centre is equipped with the latest diagnostic and treatment equipment, including MRI, CT scanners, X-ray machines, and state-of-the-art surgical instruments. This ensures accurate diagnosis and efficient treatment of the bone and joint conditions.
  Patients can trust Bone & Joint Centre for compassionate care, expert advice, and cutting-edge treatment options. Our focus is on your overall well-being, and we strive to make your visit to BJC as comfortable as possible.`,
    image: "https://s.w-x.co/138853-7/e4089855691858d103b04179174991a1/c3.jpg",
  },
  {
    name: "Diagnostic Imaging",
    description:
      "The Disgnostic Imaging Department consists of permanent Vietnamese radiologist full time doctors, supported by a regular team of French radiologist visiting specialists and external consultants, with years of experience in the field. We work together and exchange experience, creating a solid team of specialists ensure diagnostic quality to the patients and treatment physicians serving physicians in the diagnosis and treatment of diseases.",
    image: "https://www.hfh.com.vn/sites/default/files/inline-images/X-ray.jpg",
  },
  {
    name: "Pharmacy",
    description: `
      All medication is dispensed according to prescriptions from our doctors and the process fully adheres to international professional standards and local regulations.
  All medicines, vaccinations and other health care products come from trustworthy sources and originate exclusively from countries such as France, other countries in the European Community, the United States and Canada.  Products are procured through a transparent and ethical supply chain management process.
  We provide all our customers with thorough explanations accurate information and are always there to answer any questions with regard to drug-drug interactions, possible side effects, appropriate storage of medication at home, and other relevant information regarding your treatment.`,
    image: "https://www.hfh.com.vn/sites/default/files/page/Pharmacy.jpg",
  },
  {
    name: "Laboratory & Blood Bank",
    description: `
      The Laboratory provides a comprehensive range of tests in hematology, biochemistry, immunology, microbiology, cytology and pathology to patients and doctors. 
  The Laboratory works 24/7 to ensure in, and out-patients are provided with the best quality care available. It is well equipped with the latest automated technology and uses barcode readers to support accurate patient identification and tracking of results. Thanks to Laboratory Information System (LIS) and integrated Hospital Information System (HIS) test results are available to doctors in a timely manner and can be accessed by our patients via a secured portal on the hospital’s website.
  In addition to our internal quality control systems HFH laboratory has been accredited with external quality control programs like RCPA, Australia, CAP (College of American Pathologists), US, and Randox, Center for Standardization and Quality Control of Hanoi Medical University and undergoes annual survey and accreditation processes.
  The Laboratory Department is also responsible for supplying blood and blood products that may be required by our patients and is 100% compliant with blood transfusion safety regulations to guarantee the safety of blood and blood products utilized in the hospital
  The Laboratory plays an active role in the hospital’s Infection Prevention and Control Program and Active Surveillance Program to minimize the risk of hospital acquired infections to all our customers and staff.  `,
    image: "https://www.hfh.com.vn/sites/default/files/page/Lab-service.jpg",
  },
  {
    name: "Physiotherapy & Rehabilitation",
    description: `
      The physiotherapy Department provides rehabilitation services to inpatients and outpatients and collaborates closely with other specialties. Our physiotherapist supports other medical professionals to facilitate access and delivery of integrated and comprehensive care.
  Combination therapy plays an important role in a patient’s recovery after surgery or prolonged hospitalization.
  Physiotherapy includes suitable physical exercise designed for each patient. The amount and form of exercise recommended for each individual will vary depending on the patient’s situation and recovery process.`,
    image: "https://www.hfh.com.vn/sites/default/files/page/ENT.jpg",
  },
  {
    name: "Annual Health Check Up",
    description: `
      Good health is one of the most important things in life and should never be taken for granted. Early detection makes all the difference and is important to help you manage potential health risks in order to stay in the prime of health and avoid costly treatment in the future. We offer a comprehensive range of health checkup packages that will suit all age groups and both men and women.
  In additional to our wide range of available packages we also offer a large range of add on items and we fully customized programs that can be tailored to your individual or your company’s needs. Our friendly doctors will provide you with a detailed and personalized medical report and explain all the results to you together with the most comprehensive advice and recommendations for you to stay active and healthy.`,
    image:
      "https://static.hotdeal.vn/images/1582/1581995/500x500/355046-tron-goi-23-dich-vu-kham-tong-quat-toan-dien-tai-phong-kham-da-khoa-quoc-te-nhan-hau.jpg",
  },
];

export const doctorList = [
  {
    name: "Evert Witting",
    job: "doctor",
    department: "Pain Clinic",
    experience: "4 years",
    language: "Vietnamese",
    email: "Leann.Veum97@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hackensackmeridianhealth.org%2Fen%2Fhealthu%2Fpatient-perspectives%2F2022%2F08%2Fold-bridge-primary-care-doctor-fluent-in-three-languages&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABA4",
  },
  {
    name: "Hadley Morissette",
    job: "trainer",
    department: "Physiotherapy & Rehabilitation",
    experience: "6 years",
    language: "Vietnamese",
    email: "Billy.Krajcik@medcenter.net",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Sonya Becker",
    job: "trainer",
    department: "Pharmacy",
    experience: "1 years",
    language: "Vietnamese",
    email: "Kathryne.Waelchi@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Norene Wintheiser",
    job: "trainer",
    department: "General Surgery",
    experience: "9 years",
    language: "English, Vietnamese",
    email: "Paolo_Blanda26@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Germaine Lehner",
    job: "doctor",
    department: "Rheumatology",
    experience: "3 years",
    language: "Vietnamese",
    email: "Marielle.Pacocha-Hoeger@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Halie Russel-Stehr",
    job: "trainer",
    department: "Laboratory & Blood Bank",
    experience: "2 years",
    language: "English, Vietnamese",
    email: "Wilburn.Spencer66@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Kaya Medhurst",
    job: "doctor",
    department: "Rheumatology",
    experience: "6 years",
    language: "Vietnamese",
    email: "Karson56@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Christelle Kovacek",
    job: "trainer",
    department: "Diagnostic Imaging",
    experience: "5 years",
    language: "English",
    email: "Esta_McClure@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Santa Rohan",
    job: "trainer",
    department: "Physiotherapy & Rehabilitation",
    experience: "11 years",
    language: "English, Vietnamese",
    email: "Montana26@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Ana Bogan",
    job: "doctor",
    department: "Physiotherapy & Rehabilitation",
    experience: "7 years",
    language: "Vietnamese",
    email: "Monserrate.Hoppe@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Muhammad Prosacco-Weimann",
    job: "doctor",
    department: "Annual Health Check Up",
    experience: "5 years",
    language: "English",
    email: "Kevin.Littel-Bergstrom25@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hackensackmeridianhealth.org%2Fen%2Fhealthu%2Fpatient-perspectives%2F2022%2F08%2Fold-bridge-primary-care-doctor-fluent-in-three-languages&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABA4",
  },
  {
    name: "Morton Howell",
    job: "trainer",
    department: "Annual Health Check Up",
    experience: "7 years",
    language: "English",
    email: "Jake.Hansen@healthcare.org",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Nia Murphy",
    job: "trainer",
    department: "Accident & Emergency",
    experience: "6 years",
    language: "English",
    email: "Orlando.Howell@healthcare.org",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Dixie Gibson",
    job: "doctor",
    department: "General Surgery",
    experience: "3 years",
    language: "Vietnamese",
    email: "Adrain58@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hackensackmeridianhealth.org%2Fen%2Fhealthu%2Fpatient-perspectives%2F2022%2F08%2Fold-bridge-primary-care-doctor-fluent-in-three-languages&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABA4",
  },
  {
    name: "Kianna Crona",
    job: "trainer",
    department: "Bone & Joint Centre",
    experience: "6 years",
    language: "Vietnamese",
    email: "Allie.Blanda@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Abel Senger",
    job: "doctor",
    department: "Rheumatology",
    experience: "9 years",
    language: "Vietnamese",
    email: "Elbert.Bernier@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Issac Klocko",
    job: "trainer",
    department: "Pharmacy",
    experience: "6 years",
    language: "English",
    email: "Haylie.Sipes@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Estelle Stracke",
    job: "doctor",
    department: "Pharmacy",
    experience: "2 years",
    language: "Vietnamese",
    email: "Samson74@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Marilyne Zemlak",
    job: "doctor",
    department: "Bone & Joint Centre",
    experience: "7 years",
    language: "English, Vietnamese",
    email: "Rene95@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hackensackmeridianhealth.org%2Fen%2Fhealthu%2Fpatient-perspectives%2F2022%2F08%2Fold-bridge-primary-care-doctor-fluent-in-three-languages&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABA4",
  },
  {
    name: "Dan Smith-Swaniawski",
    job: "trainer",
    department: "General Surgery",
    experience: "9 years",
    language: "English, Vietnamese",
    email: "Jesse45@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Judson Hartmann",
    job: "trainer",
    department: "Laboratory & Blood Bank",
    experience: "6 years",
    language: "English",
    email: "Burley85@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Ella Torphy",
    job: "doctor",
    department: "Rheumatology",
    experience: "3 years",
    language: "Vietnamese",
    email: "Selmer.Keeling96@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Mckayla Farrell",
    job: "trainer",
    department: "Pain Clinic",
    experience: "7 years",
    language: "English, Vietnamese",
    email: "Earnest32@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Jocelyn Feest",
    job: "doctor",
    department: "Pain Clinic",
    experience: "12 years",
    language: "English",
    email: "Quentin84@hospital.com",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Braulio Gleason",
    job: "trainer",
    department: "Rheumatology",
    experience: "9 years",
    language: "Vietnamese",
    email: "Chad20@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Dallas Kirlin",
    job: "doctor",
    department: "Diagnostic Imaging",
    experience: "1 years",
    language: "English",
    email: "Leonie_Nader@medcenter.net",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Ofelia Nikolaus",
    job: "doctor",
    department: "Accident & Emergency",
    experience: "6 years",
    language: "English",
    email: "Drew27@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Maribel Dach",
    job: "doctor",
    department: "Physiotherapy & Rehabilitation",
    experience: "1 years",
    language: "Vietnamese",
    email: "Demarcus60@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Betsy Mraz",
    job: "doctor",
    department: "Accident & Emergency",
    experience: "3 years",
    language: "English",
    email: "Erna80@healthcare.org",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Toy Predovic",
    job: "doctor",
    department: "Pain Clinic",
    experience: "8 years",
    language: "Vietnamese",
    email: "Letitia20@medcenter.net",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Darrick Purdy",
    job: "doctor",
    department: "General Surgery",
    experience: "2 years",
    language: "Vietnamese",
    email: "Maxime68@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Elias Daniel",
    job: "doctor",
    department: "General Surgery",
    experience: "12 years",
    language: "English, Vietnamese",
    email: "Jarrett.Keeling68@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Mckayla Marks",
    job: "doctor",
    department: "Bone & Joint Centre",
    experience: "2 years",
    language: "Vietnamese",
    email: "Hilton93@medcenter.net",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Dorothea Shields",
    job: "trainer",
    department: "Annual Health Check Up",
    experience: "11 years",
    language: "English, Vietnamese",
    email: "Jamie_Parker@hospital.com",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Leopoldo Goyette",
    job: "doctor",
    department: "Pain Clinic",
    experience: "11 years",
    language: "Vietnamese",
    email: "Reynold.Grimes@medcenter.net",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Brandy Corwin",
    job: "doctor",
    department: "Pharmacy",
    experience: "1 years",
    language: "English",
    email: "Murphy.Nitzsche55@hospital.com",
    imageLink:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    name: "Faye Schamberger",
    job: "trainer",
    department: "Accident & Emergency",
    experience: "1 years",
    language: "English, Vietnamese",
    email: "Santa77@healthcare.org",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
  {
    name: "Verona Harber",
    job: "doctor",
    department: "Pharmacy",
    experience: "6 years",
    language: "Vietnamese",
    email: "Rhett.Williamson6@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdughealth.org%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBA",
  },
  {
    name: "Watson Murazik",
    job: "doctor",
    department: "General Surgery",
    experience: "8 years",
    language: "Vietnamese",
    email: "Georgette65@hospital.com",
    imageLink:
      "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
  },
  {
    name: "Christina Bauch",
    job: "doctor",
    department: "Physiotherapy & Rehabilitation",
    experience: "10 years",
    language: "English",
    email: "Lowell8@medcenter.net",
    imageLink:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpunchng.com%2Foutrage-as-luth-doctor-dies-after-72-hour-non-stop-shift-2%2F&psig=AOvVaw0-lr-uu--zJCXNqznREG8g&ust=1703201875248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiNxr2Xn4MDFQAAAAAdAAAAABBI",
  },
];

export const status = [
  { label: "confirmed", className: "text-green-900 bg-green-500" },
  { label: "pending", className: "text-yellow-900 bg-yellow-500" },
  { label: "canceled", className: " text-red-900 bg-red-500" },
];

export const statusOtherClass = "w-20 bg-opacity-50 p-2 rounded-[36px]";

export const timePeriod = [
  { time: "07:00 - 08:00" },
  { time: "08:00 - 09:00" },
  { time: "09:00 - 10:00" },
  { time: "10:00 - 11:00" },
  { time: "11:00 - 12:00" },
  { time: "14:00 - 15:00" },
  { time: "15:00 - 16:00" },
  { time: "16:00 - 17:00" },
];

export const navigationLinks = {
  "admin": [
      { name: "User", link: "user_list" },
      { name: "Employee", link: "employee_list" },
      { name: "Clinic", link: "clinic_list" },
      { name: "Machine", link: "machine_list" },
      { name: "Exercise", link: "exercise_list" },
      { name: "Appointment", link: "appointment_list"}
  ],
  "trainer":[ {name: "Appointment", link: "waitlist"}],
  "doctor": [{name: "Appointment", link: "waitlist"}, {name:"Chat with patient", link: "chat"}],
  "patient": [{name:"Chat with doctor", link: "chat"}],
  "receptionist": [ {name: "Appointment", link: "waitlist"}],
};

export const testAccount = [
  {role:'Doctor', username:'awingrove4', password: 'mU1}5~j3"qtM'}, 
  {role:'Patient', username:'lsmalles3', password: '184<9jD(i'},
  {role:'Administrator', username:'bqlong', password: 'liofj aADNSI/'},
  {role: 'Doctor 2', username:'etregalep', password:'pF9=t*#Yb<Ol%x'},
  {role: 'Trainer', username: 'trainer_htl', password: 'trainer123'},
  {role: 'Receptionist', username: 'recep_01', password: 'reception123'}
]

