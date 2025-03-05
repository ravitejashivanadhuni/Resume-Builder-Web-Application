export const sidebarItems = [
  { id: 1, name: 'Resume Builder', path: 'resume-builder', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 2, name: 'ATS Score', path: 'ats-score', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 3, name: 'Enhance Resume', path: 'enhance-resume', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 4, name: 'Upgrade Resume', path: 'upgrade-resume', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 5, name: 'Templates', path: 'templates', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  // { id: 6, name: 'Edit Profile', path: 'edit-profile', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  // { id: 7, name: 'My Projects', path: 'my-projects', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 8, name: 'About Us', path: 'about-us', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 9, name: 'Contact Us', path: 'contact-us', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
]

export const adminrole = [
  { id: 1, name: 'Dashboard', path: '/admin', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  {
    id: 2,
    name: 'Course Management',
    className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50',
    subMenu: [
      { id: 3, name: 'Course List', path: 'course-list', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
      { id: 4, name: 'Course Information', path: 'course-info', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' }
    ]
  },
  { id: 3, name: 'Role Management', path: 'role-management', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 4, name: 'Skill Management', path: 'skill-management', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
  { id: 5, name: 'Recruiter Management', path: 'recruiter-management', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
]

export const Recruiterrole = [
  { id: 1, name: 'Interview Review', path: '/recruiter', className: 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' },
]
