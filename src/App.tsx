import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">MindXzone</h1>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-black hover:text-blue-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('articles')}
              className="text-black hover:text-blue-600 transition-colors"
            >
              Articles
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-black hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-6 py-4 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-black hover:text-blue-600 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('articles')}
                className="text-left text-black hover:text-blue-600 transition-colors"
              >
                Articles
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-black hover:text-blue-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Simple Solutions for Complex Problems
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We help businesses transform their ideas into reality through thoughtful design and strategic execution.
            </p>
          </div>
        </section>

        <section id="services" className="py-24 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Strategy</h3>
                <p className="text-gray-600 leading-relaxed">
                  We craft comprehensive strategies that align with your business goals and drive measurable results.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Design</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beautiful, intuitive interfaces that users love and that solve real problems elegantly.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Development</h3>
                <p className="text-gray-600 leading-relaxed">
                  Robust, scalable solutions built with modern technologies and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="articles" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "The Power of Minimalist Design",
                  date: "March 15, 2024",
                  preview: "Discover how less can be more when it comes to creating impactful user experiences that resonate."
                },
                {
                  title: "Building for Scale",
                  date: "March 8, 2024",
                  preview: "Learn the essential principles for creating applications that grow seamlessly with your business."
                },
                {
                  title: "User-Centered Innovation",
                  date: "February 28, 2024",
                  preview: "Why putting users first leads to products that not only work well but delight at every touchpoint."
                },
                {
                  title: "The Art of Simplicity",
                  date: "February 20, 2024",
                  preview: "Exploring how removing complexity can lead to more powerful and accessible solutions."
                },
                {
                  title: "Digital Transformation Done Right",
                  date: "February 12, 2024",
                  preview: "A practical guide to modernizing your business without losing sight of what matters most."
                },
                {
                  title: "Future of Web Development",
                  date: "February 5, 2024",
                  preview: "Trends and technologies shaping the next generation of web applications and experiences."
                }
              ].map((article, index) => (
                <article
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-600 transition-colors cursor-pointer"
                >
                  <time className="text-sm text-gray-500">{article.date}</time>
                  <h3 className="text-xl font-semibold mt-2 mb-3">{article.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{article.preview}</p>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    Read more →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Get In Touch</h2>
            <p className="text-gray-600 text-center mb-12">
              Have a project in mind? We'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600">© 2024 Clarity. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
