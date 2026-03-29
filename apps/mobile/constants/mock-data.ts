export const MOCK_USER = {
    uid: 'mock-uid-1',
    name: 'Keert Dev',
    username: 'keertdev',
    avatar: null,
    bio: 'Building CollabSphere 🚀',
    skills: ['React', 'TypeScript', 'Node.js'],
    openToCollab: true,
    streak: 7,
}

export const MOCK_PROJECTS = [
    {
        id: 'p1',
        title: 'Nexus Chat',
        description: 'Real-time messaging platform for developers',
        techStack: ['React', 'Node.js', 'Socket.io'],
        status: 'building',
        teamMembers: ['mock-uid-1', 'mock-uid-2'],
        upvotes: ['mock-uid-1'],
        rolesNeeded: [{ role: 'React Dev', filled: false }],
    },
    {
        id: 'p2',
        title: 'DecentalShop',
        description: 'Web3 marketplace for digital assets',
        techStack: ['TypeScript', 'Solidity', 'React'],
        status: 'needs-help',
        teamMembers: ['mock-uid-2'],
        upvotes: [],
        rolesNeeded: [{ role: 'Rust Engineer', filled: false }],
    },
    {
        id: 'p3',
        title: 'CollabSphere',
        description: 'Find your people. Build something real.',
        techStack: ['Next.js', 'Firebase', 'React Native'],
        status: 'building',
        teamMembers: ['mock-uid-1', 'mock-uid-2', 'mock-uid-3'],
        upvotes: ['mock-uid-1', 'mock-uid-2'],
        rolesNeeded: [{ role: 'Designer', filled: false }],
    },
]

export const MOCK_FEED = [
    {
        id: 'u1',
        authorId: 'mock-uid-2',
        authorName: 'Sarah Chen',
        projectName: 'Nexus Chat',
        content: 'Just deployed the new landing page! Framer Motion animations are 🔥',
        likes: ['mock-uid-1'],
        comments: [],
        createdAt: new Date(Date.now() - 5 * 60000),
    },
    {
        id: 'u2',
        authorId: 'mock-uid-3',
        authorName: 'Marcus Vane',
        projectName: 'DecentalShop',
        content: 'Added multi-sig vault contracts. Security audit starting next week.',
        likes: [],
        comments: [],
        createdAt: new Date(Date.now() - 2 * 3600000),
    },
]

export const MOCK_MESSAGES = [
    {
        id: 'c1',
        participants: ['mock-uid-1', 'mock-uid-2'],
        otherUser: { name: 'Sarah Chen', avatar: null, online: true },
        lastMessage: { text: 'Let me know when PR is ready!', timestamp: new Date() },
        unread: 2,
    },
    {
        id: 'c2',
        participants: ['mock-uid-1', 'mock-uid-3'],
        otherUser: { name: 'Marcus Vane', avatar: null, online: false },
        lastMessage: { text: 'Can you review the smart contract?', timestamp: new Date(Date.now() - 3600000) },
        unread: 0,
    },
]
