export const SKILLS = [
    { name: "Python", desc: "Scripting & Backend Logic" },
    { name: "JavaScript", desc: "DOM & Interactivity" },
    { name: "HTML5", desc: "Semantic Structure" },
    { name: "CSS3", desc: "Layout & Animation" },
    { name: "Flask", desc: "RESTful APIs" },
    { name: "Streamlit", desc: "Data Apps" },
    { name: "TensorFlow", desc: "Deep Learning" },
    { name: "PyTorch", desc: "Neural Networks" },
    { name: "Generic AI", desc: "Stable Diffusion XL" },
    { name: "GitHub", desc: "Version Control" },
    { name: "Kaggle", desc: "Datasets" },
    { name: "Colab", desc: "Cloud GPU" },
];

export const EDUCATION = [
    {
        title: "Bachelor of Technology (IT)",
        meta: "Malwa Institute of Technology // CGPA 6.70",
        desc: "Focused on Data Structures, Algorithms, and System Design. Built a strong theoretical foundation in computer science principles."
    },
    {
        title: "Higher Secondary (12th Science)",
        meta: "Motherland School // 67%",
        desc: "Specialized in Physics and Mathematics, developing analytical problem-solving skills."
    },
    {
        title: "Secondary School (10th)",
        meta: "Little Wonders Convent // 65%",
        desc: "Early foundations in logic and general sciences."
    }
];

export const PROJECTS = [
    {
        title: "Bird Species Identification",
        tech: "CNN • RNN • Flask • Streamlit",
        desc: "A multi-modal classification system capable of identifying 450 bird species. The architecture fuses visual data (processed via ResNet50 CNN) with audio spectrograms (processed via RNN) to achieve high-accuracy predictions.",
        key: "Kaggle Datasets, Transfer Learning, Audio-Visual Fusion.",
        img1: "/assets/project_bird_blue.png",
        img2: "/assets/project_bird_dark.png"
    },
    {
        title: "SDXL Text-to-Image Generator",
        tech: "Stable Diffusion XL • Colab GPU • Ngrok",
        desc: "A distributed generative AI pipeline. To bypass local hardware limits, the inference engine runs on a Google Colab T4 GPU. A Flask API is exposed via Ngrok tunneling, consumed by a local Streamlit frontend for real-time image synthesis.",
        key: "Distributed Cloud Compute, Latent Diffusion.",
        img1: "/assets/project_genai_input.png",
        img2: "/assets/project_genai_output.png"
    },
    {
        title: "Bhole Guru (Spiritual E-Commerce)",
        tech: "React.js • Node.js • Cloudinary",
        desc: "A full-stack e-commerce platform for spiritual artifacts. Features a custom admin dashboard for real-time inventory management, authentication, and an optimized checkout flow. Designed with a 'Temple Corridor' aesthetic to match the brand's identity.",
        key: "Online Store, Admin Panel, Secure Login.",
        images: [
            "/assets/bhole_guru_home.png",
            "/assets/bhole_guru_pillars.png",
            "/assets/bhole_guru_about.png",
            "/assets/bhole_guru_shop.png"
        ]
    },
    {
        title: "The Legacy Core (V1)",
        tech: "HTML5 • CSS3 • Vanilla JS",
        desc: "My genesis portfolio built entirely from scratch without frameworks. It demonstrates raw mastery of styling, layout engines, and responsive design principles before I evolved to the Next.js ecosystem. A testament to understanding the fundamentals.",
        key: "Pure CSS Architecture, Hand-coded Animations.",
        img1: "/assets/legacy_home.png",
        img2: "/assets/legacy_projects.png"
    }
];

export const CERTS = [
    { img: "/assets/cert_aws.png", label: "AWS CERTIFIED" },
    { img: "/assets/cert_python_skillup.png", label: "PYTHON SKILLUP" },
    { img: "/assets/cert_scaler.png", label: "SCALER ACADEMY" },
    { img: "/assets/cert_udemy.png", label: "PYTHON BOOTCAMP" },
    { img: "/assets/cert_linkedin.png", label: "LINKEDIN SKILL" },
];
