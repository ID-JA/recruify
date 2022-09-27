import { v4 as uuidv4 } from 'uuid'

export interface ProfessionalSkillOption {
  readonly value: string
  readonly label: string
}

export const professionalSkillOptions = [
  {
    label: 'Zoho',
    value: 'Zoho',
  },
  {
    label: 'Zendesk',
    value: 'Zendesk',
  },
  {
    label: 'Zend',
    value: 'Zend',
  },
  {
    label: 'Zen Cart',
    value: 'Zen Cart',
  },
  {
    label: 'Zbrush',
    value: 'Zbrush',
  },
  {
    label: 'YouTube',
    value: 'YouTube',
  },
  {
    label: 'Yii',
    value: 'Yii',
  },
  {
    label: 'Yiddish',
    value: 'Yiddish',
  },
  {
    label: 'Yarn',
    value: 'Yarn',
  },
  {
    label: 'Yard Work / Removal',
    value: 'Yard Work / Removal',
  },
  {
    label: 'Yahoo! Store Design',
    value: 'Yahoo! Store Design',
  },
  {
    label: 'XSLT',
    value: 'XSLT',
  },
  {
    label: 'XQuery',
    value: 'XQuery',
  },
  {
    label: 'XPages',
    value: 'XPages',
  },
  {
    label: 'Xoops',
    value: 'Xoops',
  },
  {
    label: 'Xojo',
    value: 'Xojo',
  },
  {
    label: 'XMPP',
    value: 'XMPP',
  },
  {
    label: 'XML',
    value: 'XML',
  },
  {
    label: 'Xero',
    value: 'Xero',
  },
  {
    label: 'Xamarin',
    value: 'Xamarin',
  },
  {
    label: 'x86/x64 Assembler',
    value: 'x86/x64 Assembler',
  },
  {
    label: 'Wufoo',
    value: 'Wufoo',
  },
  {
    label: 'WPF',
    value: 'WPF',
  },
  {
    label: 'Workshops',
    value: 'Workshops',
  },
  {
    label: 'WordPress',
    value: 'WordPress',
  },
  {
    label: 'Word Processing',
    value: 'Word Processing',
  },
  {
    label: 'Word',
    value: 'Word',
  },
  {
    label: 'WooCommerce',
    value: 'WooCommerce',
  },
  {
    label: 'Wolfram',
    value: 'Wolfram',
  },
  {
    label: 'Wix',
    value: 'Wix',
  },
  {
    label: 'Wireless',
    value: 'Wireless',
  },
  {
    label: 'Wireframes',
    value: 'Wireframes',
  },
  {
    label: 'Windows Server',
    value: 'Windows Server',
  },
  {
    label: 'Windows Phone',
    value: 'Windows Phone',
  },
  {
    label: 'Windows Mobile',
    value: 'Windows Mobile',
  },
  {
    label: 'Windows Desktop',
    value: 'Windows Desktop',
  },
  {
    label: 'Windows CE',
    value: 'Windows CE',
  },
  {
    label: 'Windows API',
    value: 'Windows API',
  },
  {
    label: 'Windows 8',
    value: 'Windows 8',
  },
  {
    label: 'Wikipedia',
    value: 'Wikipedia',
  },
  {
    label: 'WIKI',
    value: 'WIKI',
  },
  {
    label: 'WHMCS',
    value: 'WHMCS',
  },
  {
    label: 'Welsh',
    value: 'Welsh',
  },
  {
    label: 'Weebly',
    value: 'Weebly',
  },
  {
    label: 'Weddings',
    value: 'Weddings',
  },
  {
    label: 'Website Testing',
    value: 'Website Testing',
  },
  {
    label: 'Website Management',
    value: 'Website Management',
  },
  {
    label: 'Website Design',
    value: 'Website Design',
  },
  {
    label: 'WebOS',
    value: 'WebOS',
  },
  {
    label: 'webMethods',
    value: 'webMethods',
  },
  {
    label: 'Web Services',
    value: 'Web Services',
  },
  {
    label: 'Web Security',
    value: 'Web Security',
  },
  {
    label: 'Web Search',
    value: 'Web Search',
  },
  {
    label: 'Web Scraping',
    value: 'Web Scraping',
  },
  {
    label: 'Web Hosting',
    value: 'Web Hosting',
  },
  {
    label: 'WatchKit',
    value: 'WatchKit',
  },
  {
    label: 'Vuforia',
    value: 'Vuforia',
  },
  {
    label: 'vTiger',
    value: 'vTiger',
  },
  {
    label: 'VPS',
    value: 'VPS',
  },
  {
    label: 'Volusion',
    value: 'Volusion',
  },
  {
    label: 'VoIP',
    value: 'VoIP',
  },
  {
    label: 'VoiceXML',
    value: 'VoiceXML',
  },
  {
    label: 'Voice Talent',
    value: 'Voice Talent',
  },
  {
    label: 'Voice Artist',
    value: 'Voice Artist',
  },
  {
    label: 'VMware',
    value: 'VMware',
  },
  {
    label: 'Visualization',
    value: 'Visualization',
  },
  {
    label: 'Visual Merchandising',
    value: 'Visual Merchandising',
  },
  {
    label: 'Visual Foxpro',
    value: 'Visual Foxpro',
  },
  {
    label: 'Visual Basic for Apps',
    value: 'Visual Basic for Apps',
  },
  {
    label: 'Visual Basic',
    value: 'Visual Basic',
  },
  {
    label: 'Visual Arts',
    value: 'Visual Arts',
  },
  {
    label: 'Visa / Immigration',
    value: 'Visa / Immigration',
  },
  {
    label: 'Virtuozzo',
    value: 'Virtuozzo',
  },
  {
    label: 'Virtuemart',
    value: 'Virtuemart',
  },
  {
    label: 'Virtual Worlds',
    value: 'Virtual Worlds',
  },
  {
    label: 'Virtual Assistant',
    value: 'Virtual Assistant',
  },
  {
    label: 'Viral Marketing',
    value: 'Viral Marketing',
  },
  {
    label: 'Vietnamese',
    value: 'Vietnamese',
  },
  {
    label: 'Videography',
    value: 'Videography',
  },
  {
    label: 'Video Upload',
    value: 'Video Upload',
  },
  {
    label: 'Video Services',
    value: 'Video Services',
  },
  {
    label: 'Video Production',
    value: 'Video Production',
  },
  {
    label: 'Video Editing',
    value: 'Video Editing',
  },
  {
    label: 'Video Broadcasting',
    value: 'Video Broadcasting',
  },
  {
    label: 'VertexFX',
    value: 'VertexFX',
  },
  {
    label: 'VHDL',
    value: 'VHDL',
  },
  {
    label: 'Verilog',
    value: 'Verilog',
  },
  {
    label: 'Vehicle Signage',
    value: 'Vehicle Signage',
  },
  {
    label: 'Veeam',
    value: 'Veeam',
  },
  {
    label: 'Vectorization',
    value: 'Vectorization',
  },
  {
    label: 'vBulletin',
    value: 'vBulletin',
  },
  {
    label: 'VB.NET',
    value: 'VB.NET',
  },
  {
    label: 'Varnish Cache',
    value: 'Varnish Cache',
  },
  {
    label: 'Valuation / Appraisal',
    value: 'Valuation / Appraisal',
  },
  {
    label: 'User Interface Design',
    value: 'User Interface Design',
  },
  {
    label: 'User Interface / IA',
    value: 'User Interface / IA',
  },
  {
    label: 'User Experience Design',
    value: 'User Experience Design',
  },
  {
    label: 'Usability Testing',
    value: 'Usability Testing',
  },
  {
    label: 'Urdu',
    value: 'Urdu',
  },
  {
    label: 'UNIX',
    value: 'UNIX',
  },
  {
    label: 'Unity 3D',
    value: 'Unity 3D',
  },
  {
    label: 'Unit4 Business World',
    value: 'Unit4 Business World',
  },
  {
    label: 'UML Design',
    value: 'UML Design',
  },
  {
    label: 'Umbraco',
    value: 'Umbraco',
  },
  {
    label: 'Ukrainian',
    value: 'Ukrainian',
  },
  {
    label: 'Ubuntu',
    value: 'Ubuntu',
  },
  {
    label: 'Typography',
    value: 'Typography',
  },
  {
    label: 'TYPO3',
    value: 'TYPO3',
  },
  {
    label: 'Typescript',
    value: 'Typescript',
  },
  {
    label: 'Twitter',
    value: 'Twitter',
  },
  {
    label: 'Turkish',
    value: 'Turkish',
  },
  {
    label: 'Tumblr',
    value: 'Tumblr',
  },
  {
    label: 'Troubleshooting',
    value: 'Troubleshooting',
  },
  {
    label: 'Travel Writing',
    value: 'Travel Writing',
  },
  {
    label: 'Translation',
    value: 'Translation',
  },
  {
    label: 'Transcription',
    value: 'Transcription',
  },
  {
    label: 'Training',
    value: 'Training',
  },
  {
    label: 'Traditional Chinese (Taiwan)',
    value: 'Traditional Chinese (Taiwan)',
  },
  {
    label: 'Traditional Chinese (Hong Kong)',
    value: 'Traditional Chinese (Hong Kong)',
  },
  {
    label: 'Tizen SDK for Wearables',
    value: 'Tizen SDK for Wearables',
  },
  {
    label: 'Titanium',
    value: 'Titanium',
  },
  {
    label: 'Time Management',
    value: 'Time Management',
  },
  {
    label: 'Tiling',
    value: 'Tiling',
  },
  {
    label: 'Tibco Spotfire',
    value: 'Tibco Spotfire',
  },
  {
    label: 'Thai',
    value: 'Thai',
  },
  {
    label: 'Textile Engineering',
    value: 'Textile Engineering',
  },
  {
    label: 'TestStand',
    value: 'TestStand',
  },
  {
    label: 'Testing / QA',
    value: 'Testing / QA',
  },
  {
    label: 'Test Automation',
    value: 'Test Automation',
  },
  {
    label: 'Templates',
    value: 'Templates',
  },
  {
    label: 'Telugu',
    value: 'Telugu',
  },
  {
    label: 'Telephone Handling',
    value: 'Telephone Handling',
  },
  {
    label: 'Telemarketing',
    value: 'Telemarketing',
  },
  {
    label: 'Telecommunications Engineering',
    value: 'Telecommunications Engineering',
  },
  {
    label: 'Tekla Structures',
    value: 'Tekla Structures',
  },
  {
    label: 'Technical Writing',
    value: 'Technical Writing',
  },
  {
    label: 'Technical Support',
    value: 'Technical Support',
  },
  {
    label: 'Tax Law',
    value: 'Tax Law',
  },
  {
    label: 'Tax',
    value: 'Tax',
  },
  {
    label: 'Tattoo Design',
    value: 'Tattoo Design',
  },
  {
    label: 'TaoBao API',
    value: 'TaoBao API',
  },
  {
    label: 'Tamil',
    value: 'Tamil',
  },
  {
    label: 'Tally Definition Language',
    value: 'Tally Definition Language',
  },
  {
    label: 'Tableau',
    value: 'Tableau',
  },
  {
    label: 'T-Shirts',
    value: 'T-Shirts',
  },
  {
    label: 'System Admin',
    value: 'System Admin',
  },
  {
    label: 'Symfony PHP',
    value: 'Symfony PHP',
  },
  {
    label: 'Symbian',
    value: 'Symbian',
  },
  {
    label: 'Swift',
    value: 'Swift',
  },
  {
    label: 'Swedish',
    value: 'Swedish',
  },
  {
    label: 'Surfboard Design',
    value: 'Surfboard Design',
  },
  {
    label: 'Supplier Sourcing',
    value: 'Supplier Sourcing',
  },
  {
    label: 'SugarCRM',
    value: 'SugarCRM',
  },
  {
    label: 'Subversion',
    value: 'Subversion',
  },
  {
    label: 'Structural Engineering',
    value: 'Structural Engineering',
  },
  {
    label: 'Stripe',
    value: 'Stripe',
  },
  {
    label: 'Storyboard',
    value: 'Storyboard',
  },
  {
    label: 'Storage Area Networks',
    value: 'Storage Area Networks',
  },
  {
    label: 'Sticker Design',
    value: 'Sticker Design',
  },
  {
    label: 'Steam API',
    value: 'Steam API',
  },
  {
    label: 'Statistics',
    value: 'Statistics',
  },
  {
    label: 'Statistical Analysis',
    value: 'Statistical Analysis',
  },
  {
    label: 'Stationery Design',
    value: 'Stationery Design',
  },
  {
    label: 'Startups',
    value: 'Startups',
  },
  {
    label: 'Squid Cache',
    value: 'Squid Cache',
  },
  {
    label: 'Squarespace',
    value: 'Squarespace',
  },
  {
    label: 'SQLite',
    value: 'SQLite',
  },
  {
    label: 'SQL',
    value: 'SQL',
  },
  {
    label: 'SPSS Statistics',
    value: 'SPSS Statistics',
  },
  {
    label: 'Sports',
    value: 'Sports',
  },
  {
    label: 'Splunk',
    value: 'Splunk',
  },
  {
    label: 'Sphinx',
    value: 'Sphinx',
  },
  {
    label: 'Speech Writing',
    value: 'Speech Writing',
  },
  {
    label: 'Spark',
    value: 'Spark',
  },
  {
    label: 'Spanish (Spain)',
    value: 'Spanish (Spain)',
  },
  {
    label: 'Spanish',
    value: 'Spanish',
  },
  {
    label: 'Sound Design',
    value: 'Sound Design',
  },
  {
    label: 'Solidworks',
    value: 'Solidworks',
  },
  {
    label: 'Solaris',
    value: 'Solaris',
  },
  {
    label: 'Software Testing',
    value: 'Software Testing',
  },
  {
    label: 'Software Development',
    value: 'Software Development',
  },
  {
    label: 'Software Architecture',
    value: 'Software Architecture',
  },
  {
    label: 'Socket IO',
    value: 'Socket IO',
  },
  {
    label: 'Social Networking',
    value: 'Social Networking',
  },
  {
    label: 'Social Media Marketing',
    value: 'Social Media Marketing',
  },
  {
    label: 'Social Engine',
    value: 'Social Engine',
  },
  {
    label: 'Snapchat',
    value: 'Snapchat',
  },
  {
    label: 'Smarty PHP',
    value: 'Smarty PHP',
  },
  {
    label: 'Slovenian',
    value: 'Slovenian',
  },
  {
    label: 'Slovakian',
    value: 'Slovakian',
  },
  {
    label: 'Slogans',
    value: 'Slogans',
  },
  {
    label: 'Simplified Chinese (China)',
    value: 'Simplified Chinese (China)',
  },
  {
    label: 'Silverlight',
    value: 'Silverlight',
  },
  {
    label: 'Sign Design',
    value: 'Sign Design',
  },
  {
    label: 'Siebel',
    value: 'Siebel',
  },
  {
    label: 'Short Stories',
    value: 'Short Stories',
  },
  {
    label: 'Shopping Carts',
    value: 'Shopping Carts',
  },
  {
    label: 'Shopping',
    value: 'Shopping',
  },
  {
    label: 'Shopify Templates',
    value: 'Shopify Templates',
  },
  {
    label: 'Shopify',
    value: 'Shopify',
  },
  {
    label: 'Shell Script',
    value: 'Shell Script',
  },
  {
    label: 'Sharepoint',
    value: 'Sharepoint',
  },
  {
    label: 'Sewing',
    value: 'Sewing',
  },
  {
    label: 'Serbian',
    value: 'Serbian',
  },
  {
    label: 'SEO',
    value: 'SEO',
  },
  {
    label: 'Sencha / YahooUI',
    value: 'Sencha / YahooUI',
  },
  {
    label: 'Search Engine Marketing',
    value: 'Search Engine Marketing',
  },
  {
    label: 'Sculpturing',
    value: 'Sculpturing',
  },
  {
    label: 'Scrum Development',
    value: 'Scrum Development',
  },
  {
    label: 'Scrum',
    value: 'Scrum',
  },
  {
    label: 'Script Install',
    value: 'Script Install',
  },
  {
    label: 'Screenwriting',
    value: 'Screenwriting',
  },
  {
    label: 'Scientific Research',
    value: 'Scientific Research',
  },
  {
    label: 'Scheme',
    value: 'Scheme',
  },
  {
    label: 'Scala',
    value: 'Scala',
  },
  {
    label: 'SAS',
    value: 'SAS',
  },
  {
    label: 'SAP',
    value: 'SAP',
  },
  {
    label: 'Samsung Accessory SDK',
    value: 'Samsung Accessory SDK',
  },
  {
    label: 'Samsung',
    value: 'Samsung',
  },
  {
    label: 'Salesforce.com',
    value: 'Salesforce.com',
  },
  {
    label: 'Salesforce App Development',
    value: 'Salesforce App Development',
  },
  {
    label: 'Sales',
    value: 'Sales',
  },
  {
    label: 'RWD',
    value: 'RWD',
  },
  {
    label: 'Russian',
    value: 'Russian',
  },
  {
    label: 'Ruby on Rails',
    value: 'Ruby on Rails',
  },
  {
    label: 'Ruby',
    value: 'Ruby',
  },
  {
    label: 'RTOS',
    value: 'RTOS',
  },
  {
    label: 'Roofing',
    value: 'Roofing',
  },
  {
    label: 'Romanian',
    value: 'Romanian',
  },
  {
    label: 'Rocket Engine',
    value: 'Rocket Engine',
  },
  {
    label: 'Robotics',
    value: 'Robotics',
  },
  {
    label: 'Risk Management',
    value: 'Risk Management',
  },
  {
    label: 'Reviews',
    value: 'Reviews',
  },
  {
    label: 'Resumes',
    value: 'Resumes',
  },
  {
    label: 'RESTful',
    value: 'RESTful',
  },
  {
    label: 'Research',
    value: 'Research',
  },
  {
    label: 'Report Writing',
    value: 'Report Writing',
  },
  {
    label: 'Renewable Energy Design',
    value: 'Renewable Energy Design',
  },
  {
    label: 'Removalist',
    value: 'Removalist',
  },
  {
    label: 'Remote Sensing',
    value: 'Remote Sensing',
  },
  {
    label: 'Regular Expressions',
    value: 'Regular Expressions',
  },
  {
    label: 'Redshift',
    value: 'Redshift',
  },
  {
    label: 'Redis',
    value: 'Redis',
  },
  {
    label: 'Red Hat',
    value: 'Red Hat',
  },
  {
    label: 'Recruitment',
    value: 'Recruitment',
  },
  {
    label: 'REALbasic',
    value: 'REALbasic',
  },
  {
    label: 'Real Estate',
    value: 'Real Estate',
  },
  {
    label: 'React.js',
    value: 'React.js',
  },
  {
    label: 'Ray-tracing',
    value: 'Ray-tracing',
  },
  {
    label: 'Raspberry Pi',
    value: 'Raspberry Pi',
  },
  {
    label: 'RapidWeaver',
    value: 'RapidWeaver',
  },
  {
    label: 'R Programming Language',
    value: 'R Programming Language',
  },
  {
    label: 'QuickBase',
    value: 'QuickBase',
  },
  {
    label: 'QuarkXPress',
    value: 'QuarkXPress',
  },
  {
    label: 'Quantum',
    value: 'Quantum',
  },
  {
    label: 'Qualtrics Survey Platform',
    value: 'Qualtrics Survey Platform',
  },
  {
    label: 'QlikView',
    value: 'QlikView',
  },
  {
    label: 'Python',
    value: 'Python',
  },
  {
    label: 'Puppet',
    value: 'Puppet',
  },
  {
    label: 'Punjabi',
    value: 'Punjabi',
  },
  {
    label: 'Publishing',
    value: 'Publishing',
  },
  {
    label: 'Public Relations',
    value: 'Public Relations',
  },
  {
    label: 'Psychology',
    value: 'Psychology',
  },
  {
    label: 'PSD2CMS',
    value: 'PSD2CMS',
  },
  {
    label: 'PSD to HTML',
    value: 'PSD to HTML',
  },
  {
    label: 'Protoshare',
    value: 'Protoshare',
  },
  {
    label: 'Proposal/Bid Writing',
    value: 'Proposal/Bid Writing',
  },
  {
    label: 'Property Management',
    value: 'Property Management',
  },
  {
    label: 'Property Law',
    value: 'Property Law',
  },
  {
    label: 'Property Development',
    value: 'Property Development',
  },
  {
    label: 'Proofreading',
    value: 'Proofreading',
  },
  {
    label: 'Prolog',
    value: 'Prolog',
  },
  {
    label: 'Project Scheduling',
    value: 'Project Scheduling',
  },
  {
    label: 'Project Management',
    value: 'Project Management',
  },
  {
    label: 'Programming',
    value: 'Programming',
  },
  {
    label: 'Product Sourcing',
    value: 'Product Sourcing',
  },
  {
    label: 'Product Management',
    value: 'Product Management',
  },
  {
    label: 'Product Design',
    value: 'Product Design',
  },
  {
    label: 'Product Descriptions',
    value: 'Product Descriptions',
  },
  {
    label: 'Procurement',
    value: 'Procurement',
  },
  {
    label: 'Print',
    value: 'Print',
  },
  {
    label: 'Prezi',
    value: 'Prezi',
  },
  {
    label: 'Prestashop',
    value: 'Prestashop',
  },
  {
    label: 'Press Releases',
    value: 'Press Releases',
  },
  {
    label: 'Presentations',
    value: 'Presentations',
  },
  {
    label: 'Pre-production',
    value: 'Pre-production',
  },
  {
    label: 'Powershell',
    value: 'Powershell',
  },
  {
    label: 'Powerpoint',
    value: 'Powerpoint',
  },
  {
    label: 'PostgreSQL',
    value: 'PostgreSQL',
  },
  {
    label: 'Poster Design',
    value: 'Poster Design',
  },
  {
    label: 'Post-Production',
    value: 'Post-Production',
  },
  {
    label: 'Portuguese (Brazil)',
    value: 'Portuguese (Brazil)',
  },
  {
    label: 'Portuguese',
    value: 'Portuguese',
  },
  {
    label: 'Polish',
    value: 'Polish',
  },
  {
    label: 'Poetry',
    value: 'Poetry',
  },
  {
    label: 'Poet',
    value: 'Poet',
  },
  {
    label: 'Plumbing',
    value: 'Plumbing',
  },
  {
    label: 'Plugin',
    value: 'Plugin',
  },
  {
    label: 'Plesk',
    value: 'Plesk',
  },
  {
    label: 'PLC / SCADA',
    value: 'PLC / SCADA',
  },
  {
    label: 'Piping',
    value: 'Piping',
  },
  {
    label: 'Pinterest',
    value: 'Pinterest',
  },
  {
    label: 'Pickup',
    value: 'Pickup',
  },
  {
    label: 'PICK Multivalue DB',
    value: 'PICK Multivalue DB',
  },
  {
    label: 'Physics',
    value: 'Physics',
  },
  {
    label: 'PHP',
    value: 'PHP',
  },
  {
    label: 'Photoshop Design',
    value: 'Photoshop Design',
  },
  {
    label: 'Photoshop Coding',
    value: 'Photoshop Coding',
  },
  {
    label: 'Photoshop',
    value: 'Photoshop',
  },
  {
    label: 'Photography',
    value: 'Photography',
  },
  {
    label: 'Photo Editing',
    value: 'Photo Editing',
  },
  {
    label: 'PhoneGap',
    value: 'PhoneGap',
  },
  {
    label: 'Phone Support',
    value: 'Phone Support',
  },
  {
    label: 'Petroleum Engineering',
    value: 'Petroleum Engineering',
  },
  {
    label: 'Pet Sitting',
    value: 'Pet Sitting',
  },
  {
    label: 'Pest Control',
    value: 'Pest Control',
  },
  {
    label: 'Personal Development',
    value: 'Personal Development',
  },
  {
    label: 'Perl',
    value: 'Perl',
  },
  {
    label: 'Periscope',
    value: 'Periscope',
  },
  {
    label: 'PeopleSoft',
    value: 'PeopleSoft',
  },
  {
    label: 'Pentaho',
    value: 'Pentaho',
  },
  {
    label: 'PencilBlue CMS',
    value: 'PencilBlue CMS',
  },
  {
    label: 'PEGA PRPC',
    value: 'PEGA PRPC',
  },
  {
    label: 'PDF',
    value: 'PDF',
  },
  {
    label: 'PCB Layout',
    value: 'PCB Layout',
  },
  {
    label: 'Paytrace',
    value: 'Paytrace',
  },
  {
    label: 'Payroll',
    value: 'Payroll',
  },
  {
    label: 'PayPal API',
    value: 'PayPal API',
  },
  {
    label: 'Pavement',
    value: 'Pavement',
  },
  {
    label: 'Pattern Matching',
    value: 'Pattern Matching',
  },
  {
    label: 'Pattern Making',
    value: 'Pattern Making',
  },
  {
    label: 'Patents',
    value: 'Patents',
  },
  {
    label: 'Parallels Desktop',
    value: 'Parallels Desktop',
  },
  {
    label: 'Parallels Automation',
    value: 'Parallels Automation',
  },
  {
    label: 'Parallel Processing',
    value: 'Parallel Processing',
  },
  {
    label: 'Parallax Scrolling',
    value: 'Parallax Scrolling',
  },
  {
    label: 'Papiamento',
    value: 'Papiamento',
  },
  {
    label: 'Palm',
    value: 'Palm',
  },
  {
    label: 'Painting',
    value: 'Painting',
  },
  {
    label: 'Packing / Shipping',
    value: 'Packing / Shipping',
  },
  {
    label: 'Package Design',
    value: 'Package Design',
  },
  {
    label: 'OSCommerce',
    value: 'OSCommerce',
  },
  {
    label: 'Organizational Change Management',
    value: 'Organizational Change Management',
  },
  {
    label: 'Order Processing',
    value: 'Order Processing',
  },
  {
    label: 'Oracle',
    value: 'Oracle',
  },
  {
    label: 'OpenVMS',
    value: 'OpenVMS',
  },
  {
    label: 'OpenStack',
    value: 'OpenStack',
  },
  {
    label: 'OpenSSL',
    value: 'OpenSSL',
  },
  {
    label: 'OpenSceneGraph',
    value: 'OpenSceneGraph',
  },
  {
    label: 'OpenGL',
    value: 'OpenGL',
  },
  {
    label: 'OpenCL',
    value: 'OpenCL',
  },
  {
    label: 'OpenBravo',
    value: 'OpenBravo',
  },
  {
    label: 'Open Journal Systems',
    value: 'Open Journal Systems',
  },
  {
    label: 'Open Cart',
    value: 'Open Cart',
  },
  {
    label: 'Online Writing',
    value: 'Online Writing',
  },
  {
    label: 'Odoo',
    value: 'Odoo',
  },
  {
    label: 'Oculus Mobile SDK',
    value: 'Oculus Mobile SDK',
  },
  {
    label: 'OCR',
    value: 'OCR',
  },
  {
    label: 'Objective C',
    value: 'Objective C',
  },
  {
    label: 'OAuth',
    value: 'OAuth',
  },
  {
    label: 'Nutrition',
    value: 'Nutrition',
  },
  {
    label: 'NoSQL Couch / Mongo',
    value: 'NoSQL Couch / Mongo',
  },
  {
    label: 'Norwegian',
    value: 'Norwegian',
  },
  {
    label: 'Nokia',
    value: 'Nokia',
  },
  {
    label: 'node.js',
    value: 'node.js',
  },
  {
    label: 'Nintex Workflow',
    value: 'Nintex Workflow',
  },
  {
    label: 'Nintex Forms',
    value: 'Nintex Forms',
  },
  {
    label: 'Ning',
    value: 'Ning',
  },
  {
    label: 'Nginx',
    value: 'Nginx',
  },
  {
    label: 'Newsletters',
    value: 'Newsletters',
  },
  {
    label: 'Network Administration',
    value: 'Network Administration',
  },
  {
    label: 'Natural Language',
    value: 'Natural Language',
  },
  {
    label: 'Nanotechnology',
    value: 'Nanotechnology',
  },
  {
    label: 'MySQL',
    value: 'MySQL',
  },
  {
    label: 'MySpace',
    value: 'MySpace',
  },
  {
    label: 'MYOB',
    value: 'MYOB',
  },
  {
    label: 'MVC',
    value: 'MVC',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Mural Painting',
    value: 'Mural Painting',
  },
  {
    label: 'MQTT',
    value: 'MQTT',
  },
  {
    label: 'Moving',
    value: 'Moving',
  },
  {
    label: 'Motion Graphics',
    value: 'Motion Graphics',
  },
  {
    label: 'Mortgage Brokering',
    value: 'Mortgage Brokering',
  },
  {
    label: 'Moodle',
    value: 'Moodle',
  },
  {
    label: 'MonetDB',
    value: 'MonetDB',
  },
  {
    label: 'MODx',
    value: 'MODx',
  },
  {
    label: 'Mobile Phone',
    value: 'Mobile Phone',
  },
  {
    label: 'Mobile App Testing',
    value: 'Mobile App Testing',
  },
  {
    label: 'MMORPG',
    value: 'MMORPG',
  },
  {
    label: 'MLM',
    value: 'MLM',
  },
  {
    label: 'Minitlab',
    value: 'Minitlab',
  },
  {
    label: 'Mining Engineering',
    value: 'Mining Engineering',
  },
  {
    label: 'Millwork',
    value: 'Millwork',
  },
  {
    label: 'Microstation',
    value: 'Microstation',
  },
  {
    label: 'Microsoft Visio',
    value: 'Microsoft Visio',
  },
  {
    label: 'Microsoft SQL Server',
    value: 'Microsoft SQL Server',
  },
  {
    label: 'Microsoft Outlook',
    value: 'Microsoft Outlook',
  },
  {
    label: 'Microsoft Office',
    value: 'Microsoft Office',
  },
  {
    label: 'Microsoft Hololens',
    value: 'Microsoft Hololens',
  },
  {
    label: 'Microsoft Expression',
    value: 'Microsoft Expression',
  },
  {
    label: 'Microsoft Exchange',
    value: 'Microsoft Exchange',
  },
  {
    label: 'Microsoft Access',
    value: 'Microsoft Access',
  },
  {
    label: 'Microsoft',
    value: 'Microsoft',
  },
  {
    label: 'Microcontroller',
    value: 'Microcontroller',
  },
  {
    label: 'Microbiology',
    value: 'Microbiology',
  },
  {
    label: 'Metro',
    value: 'Metro',
  },
  {
    label: 'MeteorJS',
    value: 'MeteorJS',
  },
  {
    label: 'Metatrader',
    value: 'Metatrader',
  },
  {
    label: 'Medical Writing',
    value: 'Medical Writing',
  },
  {
    label: 'Medical',
    value: 'Medical',
  },
  {
    label: 'Mechatronics',
    value: 'Mechatronics',
  },
  {
    label: 'Mechanical Engineering',
    value: 'Mechanical Engineering',
  },
  {
    label: 'Maya',
    value: 'Maya',
  },
  {
    label: 'Matlab and Mathematica',
    value: 'Matlab and Mathematica',
  },
  {
    label: 'Mathematics',
    value: 'Mathematics',
  },
  {
    label: 'Materials Engineering',
    value: 'Materials Engineering',
  },
  {
    label: 'Marketplace Service',
    value: 'Marketplace Service',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Market Research',
    value: 'Market Research',
  },
  {
    label: 'MariaDB',
    value: 'MariaDB',
  },
  {
    label: 'Map Reduce',
    value: 'Map Reduce',
  },
  {
    label: 'Manufacturing Design',
    value: 'Manufacturing Design',
  },
  {
    label: 'Manufacturing',
    value: 'Manufacturing',
  },
  {
    label: 'Management',
    value: 'Management',
  },
  {
    label: 'Maltese',
    value: 'Maltese',
  },
  {
    label: 'Malayalam',
    value: 'Malayalam',
  },
  {
    label: 'Malay',
    value: 'Malay',
  },
  {
    label: 'Makerbot',
    value: 'Makerbot',
  },
  {
    label: 'Make Up',
    value: 'Make Up',
  },
  {
    label: 'Mailwizz',
    value: 'Mailwizz',
  },
  {
    label: 'Mailchimp',
    value: 'Mailchimp',
  },
  {
    label: 'Magic Leap',
    value: 'Magic Leap',
  },
  {
    label: 'Magento',
    value: 'Magento',
  },
  {
    label: 'Machine Learning',
    value: 'Machine Learning',
  },
  {
    label: 'Macedonian',
    value: 'Macedonian',
  },
  {
    label: 'Mac OS',
    value: 'Mac OS',
  },
  {
    label: 'Lua',
    value: 'Lua',
  },
  {
    label: 'Lotus Notes',
    value: 'Lotus Notes',
  },
  {
    label: 'Logo Design',
    value: 'Logo Design',
  },
  {
    label: 'Logistics / Shipping',
    value: 'Logistics / Shipping',
  },
  {
    label: 'Locksmith',
    value: 'Locksmith',
  },
  {
    label: 'LiveCode',
    value: 'LiveCode',
  },
  {
    label: 'Lithuanian',
    value: 'Lithuanian',
  },
  {
    label: 'Lisp',
    value: 'Lisp',
  },
  {
    label: 'Linux',
    value: 'Linux',
  },
  {
    label: 'LINQ',
    value: 'LINQ',
  },
  {
    label: 'Linnworks Order Management',
    value: 'Linnworks Order Management',
  },
  {
    label: 'Linkedin',
    value: 'Linkedin',
  },
  {
    label: 'Link Building',
    value: 'Link Building',
  },
  {
    label: 'Linear Programming',
    value: 'Linear Programming',
  },
  {
    label: 'Lighting',
    value: 'Lighting',
  },
  {
    label: 'Life Coaching',
    value: 'Life Coaching',
  },
  {
    label: 'LESS/Sass/SCSS',
    value: 'LESS/Sass/SCSS',
  },
  {
    label: 'Legal Writing',
    value: 'Legal Writing',
  },
  {
    label: 'Legal Research',
    value: 'Legal Research',
  },
  {
    label: 'Legal',
    value: 'Legal',
  },
  {
    label: 'Leap Motion SDK',
    value: 'Leap Motion SDK',
  },
  {
    label: 'Leads',
    value: 'Leads',
  },
  {
    label: 'Lawn Mowing',
    value: 'Lawn Mowing',
  },
  {
    label: 'Laundry and Ironing',
    value: 'Laundry and Ironing',
  },
  {
    label: 'Latvian',
    value: 'Latvian',
  },
  {
    label: 'LaTeX',
    value: 'LaTeX',
  },
  {
    label: 'Laravel',
    value: 'Laravel',
  },
  {
    label: 'Landscaping / Gardening',
    value: 'Landscaping / Gardening',
  },
  {
    label: 'Landscaping',
    value: 'Landscaping',
  },
  {
    label: 'Landscape Design',
    value: 'Landscape Design',
  },
  {
    label: 'Landing Pages',
    value: 'Landing Pages',
  },
  {
    label: 'LabVIEW',
    value: 'LabVIEW',
  },
  {
    label: 'Label Design',
    value: 'Label Design',
  },
  {
    label: 'Korean',
    value: 'Korean',
  },
  {
    label: 'Knockout.js',
    value: 'Knockout.js',
  },
  {
    label: 'Kitchen',
    value: 'Kitchen',
  },
  {
    label: 'Kinect',
    value: 'Kinect',
  },
  {
    label: 'Kannada',
    value: 'Kannada',
  },
  {
    label: 'JSP',
    value: 'JSP',
  },
  {
    label: 'JSON',
    value: 'JSON',
  },
  {
    label: 'jQuery / Prototype',
    value: 'jQuery / Prototype',
  },
  {
    label: 'Journalist',
    value: 'Journalist',
  },
  {
    label: 'Joomla',
    value: 'Joomla',
  },
  {
    label: 'Jewellery',
    value: 'Jewellery',
  },
  {
    label: 'JDF',
    value: 'JDF',
  },
  {
    label: 'JD Edwards CNC',
    value: 'JD Edwards CNC',
  },
  {
    label: 'Javascript',
    value: 'Javascript',
  },
  {
    label: 'JavaFX',
    value: 'JavaFX',
  },
  {
    label: 'Java',
    value: 'Java',
  },
  {
    label: 'Japanese',
    value: 'Japanese',
  },
  {
    label: 'Jabber',
    value: 'Jabber',
  },
  {
    label: 'J2ME',
    value: 'J2ME',
  },
  {
    label: 'J2EE',
    value: 'J2EE',
  },
  {
    label: 'ITIL',
    value: 'ITIL',
  },
  {
    label: 'Italian',
    value: 'Italian',
  },
  {
    label: 'ISO9001',
    value: 'ISO9001',
  },
  {
    label: 'iPhone',
    value: 'iPhone',
  },
  {
    label: 'iPad',
    value: 'iPad',
  },
  {
    label: 'Ionic Framework',
    value: 'Ionic Framework',
  },
  {
    label: 'Invitation Design',
    value: 'Invitation Design',
  },
  {
    label: 'Investment Research',
    value: 'Investment Research',
  },
  {
    label: 'Inventory Management',
    value: 'Inventory Management',
  },
  {
    label: 'Intuit QuickBooks',
    value: 'Intuit QuickBooks',
  },
  {
    label: 'Interspire',
    value: 'Interspire',
  },
  {
    label: 'Interpreter',
    value: 'Interpreter',
  },
  {
    label: 'Internet Security',
    value: 'Internet Security',
  },
  {
    label: 'Internet Research',
    value: 'Internet Research',
  },
  {
    label: 'Internet Marketing',
    value: 'Internet Marketing',
  },
  {
    label: 'Interiors',
    value: 'Interiors',
  },
  {
    label: 'Interior Design',
    value: 'Interior Design',
  },
  {
    label: 'Insurance',
    value: 'Insurance',
  },
  {
    label: 'Instrumentation',
    value: 'Instrumentation',
  },
  {
    label: 'Installation',
    value: 'Installation',
  },
  {
    label: 'Instagram',
    value: 'Instagram',
  },
  {
    label: 'Inspections',
    value: 'Inspections',
  },
  {
    label: 'Infographics',
    value: 'Infographics',
  },
  {
    label: 'Industrial Engineering',
    value: 'Industrial Engineering',
  },
  {
    label: 'Industrial Design',
    value: 'Industrial Design',
  },
  {
    label: 'Indonesian',
    value: 'Indonesian',
  },
  {
    label: 'iMovie',
    value: 'iMovie',
  },
  {
    label: 'Imaging',
    value: 'Imaging',
  },
  {
    label: 'Illustrator',
    value: 'Illustrator',
  },
  {
    label: 'Illustration',
    value: 'Illustration',
  },
  {
    label: 'IKEA Installation',
    value: 'IKEA Installation',
  },
  {
    label: 'IIS',
    value: 'IIS',
  },
  {
    label: 'Icon Design',
    value: 'Icon Design',
  },
  {
    label: 'IBM Websphere Transformation Tool',
    value: 'IBM Websphere Transformation Tool',
  },
  {
    label: 'IBM Tivoli',
    value: 'IBM Tivoli',
  },
  {
    label: 'IBM BPM',
    value: 'IBM BPM',
  },
  {
    label: 'iBeacon',
    value: 'iBeacon',
  },
  {
    label: 'Hungarian',
    value: 'Hungarian',
  },
  {
    label: 'Human Sciences',
    value: 'Human Sciences',
  },
  {
    label: 'Human Resources',
    value: 'Human Resources',
  },
  {
    label: 'HTML5',
    value: 'HTML5',
  },
  {
    label: 'HTML',
    value: 'HTML',
  },
  {
    label: 'HP Openview',
    value: 'HP Openview',
  },
  {
    label: 'Housework',
    value: 'Housework',
  },
  {
    label: 'House Cleaning',
    value: 'House Cleaning',
  },
  {
    label: 'Hot Water',
    value: 'Hot Water',
  },
  {
    label: 'HomeKit',
    value: 'HomeKit',
  },
  {
    label: 'Home Organization',
    value: 'Home Organization',
  },
  {
    label: 'Home Design',
    value: 'Home Design',
  },
  {
    label: 'Home Automation',
    value: 'Home Automation',
  },
  {
    label: 'Hive',
    value: 'Hive',
  },
  {
    label: 'History',
    value: 'History',
  },
  {
    label: 'Hire me',
    value: 'Hire me',
  },
  {
    label: 'Hindi',
    value: 'Hindi',
  },
  {
    label: 'Heroku',
    value: 'Heroku',
  },
  {
    label: 'Helpdesk',
    value: 'Helpdesk',
  },
  {
    label: 'Hebrew',
    value: 'Hebrew',
  },
  {
    label: 'Heating Systems',
    value: 'Heating Systems',
  },
  {
    label: 'Health',
    value: 'Health',
  },
  {
    label: 'HBase',
    value: 'HBase',
  },
  {
    label: 'Haskell',
    value: 'Haskell',
  },
  {
    label: 'Handyman',
    value: 'Handyman',
  },
  {
    label: 'Hair Styles',
    value: 'Hair Styles',
  },
  {
    label: 'Hadoop',
    value: 'Hadoop',
  },
  {
    label: 'Guttering',
    value: 'Guttering',
  },
  {
    label: 'Grunt',
    value: 'Grunt',
  },
  {
    label: 'Growth Hacking',
    value: 'Growth Hacking',
  },
  {
    label: 'Greek',
    value: 'Greek',
  },
  {
    label: 'Grease Monkey',
    value: 'Grease Monkey',
  },
  {
    label: 'Graphic Design',
    value: 'Graphic Design',
  },
  {
    label: 'Grant Writing',
    value: 'Grant Writing',
  },
  {
    label: 'Grails',
    value: 'Grails',
  },
  {
    label: 'GPS',
    value: 'GPS',
  },
  {
    label: 'GPGPU',
    value: 'GPGPU',
  },
  {
    label: 'GoPro',
    value: 'GoPro',
  },
  {
    label: 'Google Website Optimizer',
    value: 'Google Website Optimizer',
  },
  {
    label: 'Google Webmaster Tools',
    value: 'Google Webmaster Tools',
  },
  {
    label: 'Google Web Toolkit',
    value: 'Google Web Toolkit',
  },
  {
    label: 'Google SketchUp',
    value: 'Google SketchUp',
  },
  {
    label: 'Google Plus',
    value: 'Google Plus',
  },
  {
    label: 'Google Maps API',
    value: 'Google Maps API',
  },
  {
    label: 'Google Earth',
    value: 'Google Earth',
  },
  {
    label: 'Google Cloud Storage',
    value: 'Google Cloud Storage',
  },
  {
    label: 'Google Chrome',
    value: 'Google Chrome',
  },
  {
    label: 'Google Cardboard',
    value: 'Google Cardboard',
  },
  {
    label: 'Google App Engine',
    value: 'Google App Engine',
  },
  {
    label: 'Google Analytics',
    value: 'Google Analytics',
  },
  {
    label: 'Google Adwords',
    value: 'Google Adwords',
  },
  {
    label: 'Google Adsense',
    value: 'Google Adsense',
  },
  {
    label: 'Golang',
    value: 'Golang',
  },
  {
    label: 'Glass / Mirror / Glazing',
    value: 'Glass / Mirror / Glazing',
  },
  {
    label: 'Git',
    value: 'Git',
  },
  {
    label: 'GIMP',
    value: 'GIMP',
  },
  {
    label: 'Ghostwriting',
    value: 'Ghostwriting',
  },
  {
    label: 'German',
    value: 'German',
  },
  {
    label: 'Geotechnical Engineering',
    value: 'Geotechnical Engineering',
  },
  {
    label: 'Geospatial',
    value: 'Geospatial',
  },
  {
    label: 'Geology',
    value: 'Geology',
  },
  {
    label: 'Geolocation',
    value: 'Geolocation',
  },
  {
    label: 'Genetic Engineering',
    value: 'Genetic Engineering',
  },
  {
    label: 'General Office',
    value: 'General Office',
  },
  {
    label: 'General Labor',
    value: 'General Labor',
  },
  {
    label: 'Genealogy',
    value: 'Genealogy',
  },
  {
    label: 'Gas Fitting',
    value: 'Gas Fitting',
  },
  {
    label: 'Gardening',
    value: 'Gardening',
  },
  {
    label: 'GarageBand',
    value: 'GarageBand',
  },
  {
    label: 'Gamification',
    value: 'Gamification',
  },
  {
    label: 'GameSalad',
    value: 'GameSalad',
  },
  {
    label: 'Game Development',
    value: 'Game Development',
  },
  {
    label: 'Game Design',
    value: 'Game Design',
  },
  {
    label: 'Game Consoles',
    value: 'Game Consoles',
  },
  {
    label: 'Furniture Design',
    value: 'Furniture Design',
  },
  {
    label: 'Furniture Assembly',
    value: 'Furniture Assembly',
  },
  {
    label: 'Fundraising',
    value: 'Fundraising',
  },
  {
    label: 'French (Canadian)',
    value: 'French (Canadian)',
  },
  {
    label: 'French',
    value: 'French',
  },
  {
    label: 'FreeSwitch',
    value: 'FreeSwitch',
  },
  {
    label: 'FreelancerAPI',
    value: 'FreelancerAPI',
  },
  {
    label: 'Freelance',
    value: 'Freelance',
  },
  {
    label: 'Frames / Trusses',
    value: 'Frames / Trusses',
  },
  {
    label: 'FPGA',
    value: 'FPGA',
  },
  {
    label: 'Forum Software',
    value: 'Forum Software',
  },
  {
    label: 'Forum Posting',
    value: 'Forum Posting',
  },
  {
    label: 'Fortran',
    value: 'Fortran',
  },
  {
    label: 'Format / Layout',
    value: 'Format / Layout',
  },
  {
    label: 'Food Takeaway',
    value: 'Food Takeaway',
  },
  {
    label: 'Flyscreens',
    value: 'Flyscreens',
  },
  {
    label: 'Flyer Design',
    value: 'Flyer Design',
  },
  {
    label: 'Flow Charts',
    value: 'Flow Charts',
  },
  {
    label: 'Flooring',
    value: 'Flooring',
  },
  {
    label: 'Floor Coatings',
    value: 'Floor Coatings',
  },
  {
    label: 'Flex',
    value: 'Flex',
  },
  {
    label: 'Flashmob',
    value: 'Flashmob',
  },
  {
    label: 'Flash 3D',
    value: 'Flash 3D',
  },
  {
    label: 'Firefox',
    value: 'Firefox',
  },
  {
    label: 'Finnish',
    value: 'Finnish',
  },
  {
    label: 'Finite Element Analysis',
    value: 'Finite Element Analysis',
  },
  {
    label: 'Financial Research',
    value: 'Financial Research',
  },
  {
    label: 'Financial Planning',
    value: 'Financial Planning',
  },
  {
    label: 'Financial Markets',
    value: 'Financial Markets',
  },
  {
    label: 'Financial Analysis',
    value: 'Financial Analysis',
  },
  {
    label: 'Finance',
    value: 'Finance',
  },
  {
    label: 'Finale / Sibelius',
    value: 'Finale / Sibelius',
  },
  {
    label: 'Final Cut Pro',
    value: 'Final Cut Pro',
  },
  {
    label: 'Filmmaking',
    value: 'Filmmaking',
  },
  {
    label: 'Filipino',
    value: 'Filipino',
  },
  {
    label: 'FileMaker',
    value: 'FileMaker',
  },
  {
    label: 'Fiction',
    value: 'Fiction',
  },
  {
    label: 'Feng Shui',
    value: 'Feng Shui',
  },
  {
    label: 'Fencing',
    value: 'Fencing',
  },
  {
    label: 'Fashion Modeling',
    value: 'Fashion Modeling',
  },
  {
    label: 'Fashion Design',
    value: 'Fashion Design',
  },
  {
    label: 'Facebook Marketing',
    value: 'Facebook Marketing',
  },
  {
    label: 'Face Recognition',
    value: 'Face Recognition',
  },
  {
    label: 'Extensions / Additions',
    value: 'Extensions / Additions',
  },
  {
    label: 'Expression Engine',
    value: 'Expression Engine',
  },
  {
    label: 'Express JS',
    value: 'Express JS',
  },
  {
    label: 'Excel',
    value: 'Excel',
  },
  {
    label: 'Excavation',
    value: 'Excavation',
  },
  {
    label: 'Event Staffing',
    value: 'Event Staffing',
  },
  {
    label: 'Event Planning',
    value: 'Event Planning',
  },
  {
    label: 'Etsy',
    value: 'Etsy',
  },
  {
    label: 'Estonian',
    value: 'Estonian',
  },
  {
    label: 'ERP',
    value: 'ERP',
  },
  {
    label: 'Erlang',
    value: 'Erlang',
  },
  {
    label: 'Equipment Hire',
    value: 'Equipment Hire',
  },
  {
    label: 'ePub',
    value: 'ePub',
  },
  {
    label: 'Entrepreneurship',
    value: 'Entrepreneurship',
  },
  {
    label: 'English Spelling',
    value: 'English Spelling',
  },
  {
    label: 'English Grammar',
    value: 'English Grammar',
  },
  {
    label: 'English (US)',
    value: 'English (US)',
  },
  {
    label: 'English (UK)',
    value: 'English (UK)',
  },
  {
    label: 'Engineering Drawing',
    value: 'Engineering Drawing',
  },
  {
    label: 'Engineering',
    value: 'Engineering',
  },
  {
    label: 'Energy',
    value: 'Energy',
  },
  {
    label: 'Employment Law',
    value: 'Employment Law',
  },
  {
    label: 'Ember.js',
    value: 'Ember.js',
  },
  {
    label: 'Embedded Software',
    value: 'Embedded Software',
  },
  {
    label: 'Email Marketing',
    value: 'Email Marketing',
  },
  {
    label: 'Email Handling',
    value: 'Email Handling',
  },
  {
    label: 'Email Developer',
    value: 'Email Developer',
  },
  {
    label: 'Electronics',
    value: 'Electronics',
  },
  {
    label: 'Electronic Forms',
    value: 'Electronic Forms',
  },
  {
    label: 'Electricians',
    value: 'Electricians',
  },
  {
    label: 'Electrical Engineering',
    value: 'Electrical Engineering',
  },
  {
    label: 'eLearning Designer',
    value: 'eLearning Designer',
  },
  {
    label: 'eLearning',
    value: 'eLearning',
  },
  {
    label: 'Elasticsearch',
    value: 'Elasticsearch',
  },
  {
    label: 'edX',
    value: 'edX',
  },
  {
    label: 'Education / Tutoring',
    value: 'Education / Tutoring',
  },
  {
    label: 'Editing',
    value: 'Editing',
  },
  {
    label: 'eCommerce',
    value: 'eCommerce',
  },
  {
    label: 'eBooks',
    value: 'eBooks',
  },
  {
    label: 'eBay',
    value: 'eBay',
  },
  {
    label: 'Dynamics',
    value: 'Dynamics',
  },
  {
    label: 'Dutch',
    value: 'Dutch',
  },
  {
    label: 'Dthreejs',
    value: 'Dthreejs',
  },
  {
    label: 'Drupal',
    value: 'Drupal',
  },
  {
    label: 'Drones',
    value: 'Drones',
  },
  {
    label: 'Drains',
    value: 'Drains',
  },
  {
    label: 'Drafting',
    value: 'Drafting',
  },
  {
    label: 'DotNetNuke',
    value: 'DotNetNuke',
  },
  {
    label: 'DOS',
    value: 'DOS',
  },
  {
    label: 'DNS',
    value: 'DNS',
  },
  {
    label: 'Django',
    value: 'Django',
  },
  {
    label: 'Disposals',
    value: 'Disposals',
  },
  {
    label: 'Digital Design',
    value: 'Digital Design',
  },
  {
    label: 'Desktop Support',
    value: 'Desktop Support',
  },
  {
    label: 'Design',
    value: 'Design',
  },
  {
    label: 'Demolition',
    value: 'Demolition',
  },
  {
    label: 'Delphi',
    value: 'Delphi',
  },
  {
    label: 'Delivery',
    value: 'Delivery',
  },
  {
    label: 'Decoration',
    value: 'Decoration',
  },
  {
    label: 'Decking',
    value: 'Decking',
  },
  {
    label: 'Debugging',
    value: 'Debugging',
  },
  {
    label: 'Debian',
    value: 'Debian',
  },
  {
    label: 'DDS',
    value: 'DDS',
  },
  {
    label: 'Dating',
    value: 'Dating',
  },
  {
    label: 'DataLife Engine',
    value: 'DataLife Engine',
  },
  {
    label: 'Database Programming',
    value: 'Database Programming',
  },
  {
    label: 'Database Development',
    value: 'Database Development',
  },
  {
    label: 'Database Administration',
    value: 'Database Administration',
  },
  {
    label: 'Data Warehousing',
    value: 'Data Warehousing',
  },
  {
    label: 'Data Science',
    value: 'Data Science',
  },
  {
    label: 'Data Processing',
    value: 'Data Processing',
  },
  {
    label: 'Data Mining',
    value: 'Data Mining',
  },
  {
    label: 'Data Entry',
    value: 'Data Entry',
  },
  {
    label: 'Dart',
    value: 'Dart',
  },
  {
    label: 'Dari',
    value: 'Dari',
  },
  {
    label: 'Danish',
    value: 'Danish',
  },
  {
    label: 'Damp Proofing',
    value: 'Damp Proofing',
  },
  {
    label: 'Czech',
    value: 'Czech',
  },
  {
    label: 'Customer Support',
    value: 'Customer Support',
  },
  {
    label: 'Customer Service',
    value: 'Customer Service',
  },
  {
    label: 'CUDA',
    value: 'CUDA',
  },
  {
    label: 'CubeCart',
    value: 'CubeCart',
  },
  {
    label: 'CSS',
    value: 'CSS',
  },
  {
    label: 'CS-Cart',
    value: 'CS-Cart',
  },
  {
    label: 'Crystal Reports',
    value: 'Crystal Reports',
  },
  {
    label: 'Cryptography',
    value: 'Cryptography',
  },
  {
    label: 'Croatian',
    value: 'Croatian',
  },
  {
    label: 'CRM',
    value: 'CRM',
  },
  {
    label: 'Creative Writing',
    value: 'Creative Writing',
  },
  {
    label: 'Creative Design',
    value: 'Creative Design',
  },
  {
    label: 'CRE Loaded',
    value: 'CRE Loaded',
  },
  {
    label: 'Covers / Packaging',
    value: 'Covers / Packaging',
  },
  {
    label: 'Courses',
    value: 'Courses',
  },
  {
    label: 'Corporate Identity',
    value: 'Corporate Identity',
  },
  {
    label: 'Copywriting',
    value: 'Copywriting',
  },
  {
    label: 'Copy Typing',
    value: 'Copy Typing',
  },
  {
    label: 'Cooking / Baking',
    value: 'Cooking / Baking',
  },
  {
    label: 'Cooking / Recipes',
    value: 'Cooking / Recipes',
  },
  {
    label: 'Conversion Rate Optimisation',
    value: 'Conversion Rate Optimisation',
  },
  {
    label: 'Contracts',
    value: 'Contracts',
  },
  {
    label: 'Content Writing',
    value: 'Content Writing',
  },
  {
    label: 'Construction Monitoring',
    value: 'Construction Monitoring',
  },
  {
    label: 'Concreting',
    value: 'Concreting',
  },
  {
    label: 'Concept Design',
    value: 'Concept Design',
  },
  {
    label: 'Concept Art',
    value: 'Concept Art',
  },
  {
    label: 'Computer Security',
    value: 'Computer Security',
  },
  {
    label: 'Computer Help',
    value: 'Computer Help',
  },
  {
    label: 'Computer Graphics',
    value: 'Computer Graphics',
  },
  {
    label: 'Compliance',
    value: 'Compliance',
  },
  {
    label: 'Communications',
    value: 'Communications',
  },
  {
    label: 'Commercials',
    value: 'Commercials',
  },
  {
    label: 'Commercial Cleaning',
    value: 'Commercial Cleaning',
  },
  {
    label: 'Columns',
    value: 'Columns',
  },
  {
    label: 'Cold Fusion',
    value: 'Cold Fusion',
  },
  {
    label: 'Coding',
    value: 'Coding',
  },
  {
    label: 'Codeigniter',
    value: 'Codeigniter',
  },
  {
    label: 'Cocoa',
    value: 'Cocoa',
  },
  {
    label: 'COBOL',
    value: 'COBOL',
  },
  {
    label: 'Coating Materials',
    value: 'Coating Materials',
  },
  {
    label: 'CMS',
    value: 'CMS',
  },
  {
    label: 'Cloud Computing',
    value: 'Cloud Computing',
  },
  {
    label: 'Clothesline',
    value: 'Clothesline',
  },
  {
    label: 'CLIPS',
    value: 'CLIPS',
  },
  {
    label: 'Climate Sciences',
    value: 'Climate Sciences',
  },
  {
    label: 'Cleaning Upholstery',
    value: 'Cleaning Upholstery',
  },
  {
    label: 'Cleaning Domestic',
    value: 'Cleaning Domestic',
  },
  {
    label: 'Cleaning Carpet',
    value: 'Cleaning Carpet',
  },
  {
    label: 'Clean Technology',
    value: 'Clean Technology',
  },
  {
    label: 'Classifieds Posting',
    value: 'Classifieds Posting',
  },
  {
    label: 'Civil Engineering',
    value: 'Civil Engineering',
  },
  {
    label: 'Cisco',
    value: 'Cisco',
  },
  {
    label: 'Circuit Design',
    value: 'Circuit Design',
  },
  {
    label: 'Cinema 4D',
    value: 'Cinema 4D',
  },
  {
    label: 'Chrome OS',
    value: 'Chrome OS',
  },
  {
    label: 'Christmas',
    value: 'Christmas',
  },
  {
    label: 'Chordiant',
    value: 'Chordiant',
  },
  {
    label: 'Chemical Engineering',
    value: 'Chemical Engineering',
  },
  {
    label: 'Chef Configuration Management',
    value: 'Chef Configuration Management',
  },
  {
    label: 'CGI',
    value: 'CGI',
  },
  {
    label: 'Cement Bonding Agents',
    value: 'Cement Bonding Agents',
  },
  {
    label: 'Ceilings',
    value: 'Ceilings',
  },
  {
    label: 'CATIA',
    value: 'CATIA',
  },
  {
    label: 'Catch Phrases',
    value: 'Catch Phrases',
  },
  {
    label: 'Catalan',
    value: 'Catalan',
  },
  {
    label: 'Cassandra',
    value: 'Cassandra',
  },
  {
    label: 'CasperJS',
    value: 'CasperJS',
  },
  {
    label: 'Carwashing',
    value: 'Carwashing',
  },
  {
    label: 'Cartography / Maps',
    value: 'Cartography / Maps',
  },
  {
    label: 'Carports',
    value: 'Carports',
  },
  {
    label: 'Carpet Repair / Laying',
    value: 'Carpet Repair / Laying',
  },
  {
    label: 'Carpentry',
    value: 'Carpentry',
  },
  {
    label: 'Caricature / Cartoons',
    value: 'Caricature / Cartoons',
  },
  {
    label: 'Capture NX2',
    value: 'Capture NX2',
  },
  {
    label: 'Call Control XML',
    value: 'Call Control XML',
  },
  {
    label: 'Call Center',
    value: 'Call Center',
  },
  {
    label: 'CakePHP',
    value: 'CakePHP',
  },
  {
    label: 'CAD/CAM',
    value: 'CAD/CAM',
  },
  {
    label: 'C++ Programming',
    value: 'C++ Programming',
  },
  {
    label: 'C# Programming',
    value: 'C# Programming',
  },
  {
    label: 'C Programming',
    value: 'C Programming',
  },
  {
    label: 'Buyer Sourcing',
    value: 'Buyer Sourcing',
  },
  {
    label: 'Business Writing',
    value: 'Business Writing',
  },
  {
    label: 'Business Plans',
    value: 'Business Plans',
  },
  {
    label: 'Business Intelligence',
    value: 'Business Intelligence',
  },
  {
    label: 'Business Coaching',
    value: 'Business Coaching',
  },
  {
    label: 'Business Catalyst',
    value: 'Business Catalyst',
  },
  {
    label: 'Business Cards',
    value: 'Business Cards',
  },
  {
    label: 'Business Analysis',
    value: 'Business Analysis',
  },
  {
    label: 'Bulk Marketing',
    value: 'Bulk Marketing',
  },
  {
    label: 'Bulgarian',
    value: 'Bulgarian',
  },
  {
    label: 'Building Surveyors',
    value: 'Building Surveyors',
  },
  {
    label: 'Building Designer',
    value: 'Building Designer',
  },
  {
    label: 'Building Consultants',
    value: 'Building Consultants',
  },
  {
    label: 'Building Certifiers',
    value: 'Building Certifiers',
  },
  {
    label: 'Building Architecture',
    value: 'Building Architecture',
  },
  {
    label: 'Building',
    value: 'Building',
  },
  {
    label: 'BSD',
    value: 'BSD',
  },
  {
    label: 'Brochure Design',
    value: 'Brochure Design',
  },
  {
    label: 'Broadcast Engineering',
    value: 'Broadcast Engineering',
  },
  {
    label: 'Bricklaying',
    value: 'Bricklaying',
  },
  {
    label: 'Branding',
    value: 'Branding',
  },
  {
    label: 'Brain Storming',
    value: 'Brain Storming',
  },
  {
    label: 'Brackets',
    value: 'Brackets',
  },
  {
    label: 'BPO',
    value: 'BPO',
  },
  {
    label: 'Bower',
    value: 'Bower',
  },
  {
    label: 'Bosnian',
    value: 'Bosnian',
  },
  {
    label: 'Bootstrap',
    value: 'Bootstrap',
  },
  {
    label: 'Boonex Dolphin',
    value: 'Boonex Dolphin',
  },
  {
    label: 'Bookkeeping',
    value: 'Bookkeeping',
  },
  {
    label: 'Book Writing',
    value: 'Book Writing',
  },
  {
    label: 'Book Artist',
    value: 'Book Artist',
  },
  {
    label: 'BMC Remedy',
    value: 'BMC Remedy',
  },
  {
    label: 'Bluetooth Low Energy (BLE)',
    value: 'Bluetooth Low Energy (BLE)',
  },
  {
    label: 'Blog Install',
    value: 'Blog Install',
  },
  {
    label: 'Blog Design',
    value: 'Blog Design',
  },
  {
    label: 'Blog',
    value: 'Blog',
  },
  {
    label: 'Blackberry',
    value: 'Blackberry',
  },
  {
    label: 'Biztalk',
    value: 'Biztalk',
  },
  {
    label: 'Bitcoin',
    value: 'Bitcoin',
  },
  {
    label: 'Biotechnology',
    value: 'Biotechnology',
  },
  {
    label: 'Biology',
    value: 'Biology',
  },
  {
    label: 'Binary Analysis',
    value: 'Binary Analysis',
  },
  {
    label: 'BigCommerce',
    value: 'BigCommerce',
  },
  {
    label: 'Big Data',
    value: 'Big Data',
  },
  {
    label: 'Bengali',
    value: 'Bengali',
  },
  {
    label: 'Bathroom',
    value: 'Bathroom',
  },
  {
    label: 'Basque',
    value: 'Basque',
  },
  {
    label: 'Banner Design',
    value: 'Banner Design',
  },
  {
    label: 'Bamboo Flooring',
    value: 'Bamboo Flooring',
  },
  {
    label: 'Balustrading',
    value: 'Balustrading',
  },
  {
    label: 'Balsamiq',
    value: 'Balsamiq',
  },
  {
    label: 'backbone.js',
    value: 'backbone.js',
  },
  {
    label: 'Azure',
    value: 'Azure',
  },
  {
    label: 'Axure',
    value: 'Axure',
  },
  {
    label: 'Awnings',
    value: 'Awnings',
  },
  {
    label: 'Autotask',
    value: 'Autotask',
  },
  {
    label: 'Automotive',
    value: 'Automotive',
  },
  {
    label: 'AutoHotkey',
    value: 'AutoHotkey',
  },
  {
    label: 'Autodesk Revit',
    value: 'Autodesk Revit',
  },
  {
    label: 'Autodesk Inventor',
    value: 'Autodesk Inventor',
  },
  {
    label: 'AutoCAD',
    value: 'AutoCAD',
  },
  {
    label: 'Augmented Reality',
    value: 'Augmented Reality',
  },
  {
    label: 'Audit',
    value: 'Audit',
  },
  {
    label: 'Audio Services',
    value: 'Audio Services',
  },
  {
    label: 'Audio Production',
    value: 'Audio Production',
  },
  {
    label: 'Attorney',
    value: 'Attorney',
  },
  {
    label: 'Attic Access Ladders',
    value: 'Attic Access Ladders',
  },
  {
    label: 'Astrophysics',
    value: 'Astrophysics',
  },
  {
    label: 'Asterisk PBX',
    value: 'Asterisk PBX',
  },
  {
    label: 'Assembly',
    value: 'Assembly',
  },
  {
    label: 'Asphalt',
    value: 'Asphalt',
  },
  {
    label: 'ASP.NET',
    value: 'ASP.NET',
  },
  {
    label: 'ASP',
    value: 'ASP',
  },
  {
    label: 'Asbestos Removal',
    value: 'Asbestos Removal',
  },
  {
    label: 'AS400 / iSeries',
    value: 'AS400 / iSeries',
  },
  {
    label: 'Arts / Crafts',
    value: 'Arts / Crafts',
  },
  {
    label: 'Artificial Intelligence',
    value: 'Artificial Intelligence',
  },
  {
    label: 'Articles',
    value: 'Articles',
  },
  {
    label: 'Article Submission',
    value: 'Article Submission',
  },
  {
    label: 'Article Rewriting',
    value: 'Article Rewriting',
  },
  {
    label: 'Argus Monitoring Software',
    value: 'Argus Monitoring Software',
  },
  {
    label: 'Arduino',
    value: 'Arduino',
  },
  {
    label: 'Arabic',
    value: 'Arabic',
  },
  {
    label: 'Appliance Repair',
    value: 'Appliance Repair',
  },
  {
    label: 'Appliance Installation',
    value: 'Appliance Installation',
  },
  {
    label: 'Applescript',
    value: 'Applescript',
  },
  {
    label: 'Apple Watch',
    value: 'Apple Watch',
  },
  {
    label: 'Apple Safari',
    value: 'Apple Safari',
  },
  {
    label: 'Apple Motion',
    value: 'Apple Motion',
  },
  {
    label: 'Apple Logic Pro',
    value: 'Apple Logic Pro',
  },
  {
    label: 'Apple iBooks Author',
    value: 'Apple iBooks Author',
  },
  {
    label: 'Apple Compressor',
    value: 'Apple Compressor',
  },
  {
    label: 'Appcelerator Titanium',
    value: 'Appcelerator Titanium',
  },
  {
    label: 'App Developer',
    value: 'App Developer',
  },
  {
    label: 'App Designer',
    value: 'App Designer',
  },
  {
    label: 'Apache Solr',
    value: 'Apache Solr',
  },
  {
    label: 'Apache Ant',
    value: 'Apache Ant',
  },
  {
    label: 'Apache',
    value: 'Apache',
  },
  {
    label: 'Anything Goes',
    value: 'Anything Goes',
  },
  {
    label: 'Antenna Services',
    value: 'Antenna Services',
  },
  {
    label: 'Animation',
    value: 'Animation',
  },
  {
    label: 'Angular.js',
    value: 'Angular.js',
  },
  {
    label: 'Android Wear SDK',
    value: 'Android Wear SDK',
  },
  {
    label: 'Android Honeycomb',
    value: 'Android Honeycomb',
  },
  {
    label: 'Android',
    value: 'Android',
  },
  {
    label: 'Analytics',
    value: 'Analytics',
  },
  {
    label: 'AMQP',
    value: 'AMQP',
  },
  {
    label: 'Amazon Web Services',
    value: 'Amazon Web Services',
  },
  {
    label: 'Amazon Kindle',
    value: 'Amazon Kindle',
  },
  {
    label: 'Amazon Fire',
    value: 'Amazon Fire',
  },
  {
    label: 'Alibaba',
    value: 'Alibaba',
  },
  {
    label: 'Algorithm',
    value: 'Algorithm',
  },
  {
    label: 'Albanian',
    value: 'Albanian',
  },
  {
    label: 'AJAX',
    value: 'AJAX',
  },
  {
    label: 'Airbnb',
    value: 'Airbnb',
  },
  {
    label: 'Air Conditioning',
    value: 'Air Conditioning',
  },
  {
    label: 'Agronomy',
    value: 'Agronomy',
  },
  {
    label: 'Agile Development',
    value: 'Agile Development',
  },
  {
    label: 'After Effects',
    value: 'After Effects',
  },
  {
    label: 'Afrikaans',
    value: 'Afrikaans',
  },
  {
    label: 'Affiliate Marketing',
    value: 'Affiliate Marketing',
  },
  {
    label: 'Aerospace Engineering',
    value: 'Aerospace Engineering',
  },
  {
    label: 'Aeronautical Engineering',
    value: 'Aeronautical Engineering',
  },
  {
    label: 'Advertising',
    value: 'Advertising',
  },
  {
    label: 'Advertisement Design',
    value: 'Advertisement Design',
  },
  {
    label: 'Adobe Premiere Pro',
    value: 'Adobe Premiere Pro',
  },
  {
    label: 'Adobe LiveCycle Designer',
    value: 'Adobe LiveCycle Designer',
  },
  {
    label: 'Adobe Lightroom',
    value: 'Adobe Lightroom',
  },
  {
    label: 'Adobe InDesign',
    value: 'Adobe InDesign',
  },
  {
    label: 'Adobe Flash',
    value: 'Adobe Flash',
  },
  {
    label: 'Adobe Fireworks',
    value: 'Adobe Fireworks',
  },
  {
    label: 'Adobe Dreamweaver',
    value: 'Adobe Dreamweaver',
  },
  {
    label: 'Adobe Captivate',
    value: 'Adobe Captivate',
  },
  {
    label: 'Adobe Air',
    value: 'Adobe Air',
  },
  {
    label: 'Ad Planning / Buying',
    value: 'Ad Planning / Buying',
  },
  {
    label: 'Active Directory',
    value: 'Active Directory',
  },
  {
    label: 'ActionScript',
    value: 'ActionScript',
  },
  {
    label: 'Accounting',
    value: 'Accounting',
  },
  {
    label: 'Academic Writing',
    value: 'Academic Writing',
  },
  {
    label: '4D',
    value: '4D',
  },
  {
    label: '3ds Max',
    value: '3ds Max',
  },
  {
    label: '3D Rendering',
    value: '3D Rendering',
  },
  {
    label: '3D Printing',
    value: '3D Printing',
  },
  {
    label: '3D Modelling',
    value: '3D Modelling',
  },
  {
    label: '3D Model Maker',
    value: '3D Model Maker',
  },
  {
    label: '3D Design',
    value: '3D Design',
  },
  {
    label: '3D Animation',
    value: '3D Animation',
  },
  {
    label: '360-degree video',
    value: '360-degree video',
  },
  {
    label: '.NET',
    value: '.NET',
  },
]

export type Job = {
  id: string
  title: string
  location: string
  company: string
  createdAt: string
  createdBy: string
  status: string
  candidates: number
  visitors: number
}

// const newJob = (): Job => {
//   return {
//     id: faker.datatype.uuid(),
//     title: faker.name.jobTitle(),
//     company: faker.company.name(),
//     location: faker.address.cityName(),
//     createdAt: '20/02/2020',
//     createdBy: faker.name.fullName(),
//     candidates: faker.datatype.number({
//       max: 20,
//       min: 0,
//     }),
//     visitors: faker.datatype.number({
//       max: 20,
//       min: 0,
//     }),
//     status: faker.helpers.arrayElement(['draft', 'active', 'unknown']),
//   }
// }

export const demoData: Job[] = [
  {
    id: uuidv4(),
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    visitors: 20,
  },
  {
    id: uuidv4(),
    title: 'JavaScript developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'draft',
    candidates: 5,
    visitors: 20,
  },
  {
    id: uuidv4(),
    title: 'Data Analytic Engineer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'active',
    candidates: 5,
    visitors: 12,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'Back end developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
  {
    id: uuidv4(),
    title: 'DotNet developer',
    location: 'Aurora, CO, USA',
    company: 'Google Labs',
    createdAt: '09/01/23',
    createdBy: 'Kent Smith',
    status: 'blabla', // should render as badge
    candidates: 0,
    visitors: 2,
  },
]
