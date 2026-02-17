export const adminConfigs = {
  projects: {
    title: "Projects",
    module: "projects",
    fields: [
      { name: 'title', label: 'Project Title', type: 'text' },
      { name: 'serviceType', label: 'Service Category', type: 'select', 
        options: ['IoT & Hardware', 'Software Development', 'Artificial Intelligence', 'Training'] 
      },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'tech', label: 'Technologies (Comma Separated)', type: 'text' },
      { name: 'image', label: 'Image URL', type: 'text' },
      { name: 'isFeatured', label: 'Featured Project', type: 'checkbox' }
    ]
  },

  team: {
    title: "Team Members",
    module: "team",
    fields: [
      { name: 'name', label: 'Full Name', type: 'text' },
      { name: 'specialty', label: 'Specialty/Role', type: 'text' },
      { name: 'image', label: 'Profile Image URL', type: 'text' },
      { name: 'linkedin', label: 'LinkedIn URL', type: 'text' },
      { name: 'github', label: 'GitHub URL', type: 'text' }
    ]
  },

  testimonials: {
    title: "Testimonials",
    module: "testimonials",
    fields: [
      { name: 'name', label: 'Client Name', type: 'text' },
      { name: 'role', label: 'Designation/Role', type: 'text' },
      { name: 'text', label: 'Testimonial Text', type: 'textarea' },
      { name: 'avatar', label: 'Avatar URL', type: 'text' },
      { name: 'star', label: 'Rating (1-5)', type: 'number' }
    ]
  },

  clients: {
    title: "Our Clients",
    module: "clients",
    fields: [
      { name: 'name', label: 'Client Name', type: 'text' },
      { name: 'logo', label: 'Logo URL', type: 'text' }
    ]
  },

  stats: {
    title: "Company Statistics",
    module: "stats",
    fields: [
      { name: 'label', label: 'Stat Label (e.g. Projects Done)', type: 'text' },
      { name: 'value', label: 'Numeric Value', type: 'number' }
    ]
  },

  contacts: {
    title: "Inquiries & Messages",
    module: "", // Usually just /api/all-contacts based on your routes
    fields: [
      { name: 'name', label: 'Sender', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'message', label: 'Message', type: 'textarea' }
    ],
    readOnly: true // Custom flag if you want to disable "Create" for contacts
  }
};