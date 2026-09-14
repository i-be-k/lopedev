import { UserProfile, Task } from './index';

// 1. MOCK USERS FOR TESTING ALL THREE TIERS
export const mockUsers: Record<string, UserProfile> = {
    beginnerUser: {
        id: "usr-001",
        fullName: "Chidi Obi",
        email: "chidi@intranet.io",
        experienceTier: "beginner",
        assignedSpecialty: "undetermined",
        hiddenMetrics: { frontendPoints: 0, backendPoints: 0, devopsPoints: 0 }
    },
    midUser: {
        id: "usr-002",
        fullName: "Amina Yusuf",
        email: "amina@intranet.io",
        experienceTier: "mid-level",
        assignedSpecialty: "undetermined",
        hiddenMetrics: { frontendPoints: 15, backendPoints: 20, devopsPoints: 5 }
    },
    expUser: {
        id: "usr-003",
        fullName: "Tunde Bakare",
        email: "tunde@intranet.io",
        experienceTier: "experienced",
        assignedSpecialty: "fullstack",
        hiddenMetrics: { frontendPoints: 50, backendPoints: 50, devopsPoints: 40 }
    }
};

// 2. COMPREHENSIVE TASK POOL FOR ALL TIERS
export const mockTasks: Task[] = [
  // === BEGINNER TIER TASKS (Days 1 - 3) ===
    {
        id: "tsk-b1",
        title: "Shell, Basics: Introduction to the Navigation Grid",
        description: "Learn how to traverse directories, create files, and manipulate text strings using echo, cat, and redirection natively inside your Linux terminal terminal.",
        targetTier: "beginner",
        specialtyTag: "devops",
        pointsWorth: 10,
        unlockDay: 1,
        status: "passed"
    },
    {
        id: "tsk-b2",
        title: "HTML/CSS Foundations: Building Structured Layouts",
        description: "Construct a clean semantic user portfolio layout profile utilizing CSS Flexbox parameters, native grid structures, and core responsive styling.",
        targetTier: "beginner",
        specialtyTag: "frontend",
        pointsWorth: 15,
        unlockDay: 2,
        status: "in_progress"
    },
    {
        id: "tsk-b3",
        title: "JavaScript Basics: Functional Control Flow",
        description: "Write your first automation script executing basic algorithm loops, conditions, array map systems, and object factories.",
        targetTier: "beginner",
        specialtyTag: "backend",
        pointsWorth: 15,
        unlockDay: 3,
        status: "available"
    },

    // === MID-LEVEL TIER TASKS (Days 1 - 3) ===
    {
        id: "tsk-m1",
        title: "Advanced React Context & Global State Optimization",
        description: "Refactor a bloated state dashboard application utilizing custom state hooks, decoupling re-render trees, and structural layout caching.",
        targetTier: "mid-level",
        specialtyTag: "frontend",
        pointsWorth: 30,
        unlockDay: 1,
        status: "passed"
    },
    {
        id: "tsk-m2",
        title: "Relational DB Design & Index Tuning Optimization",
        description: "De-normalize a highly inefficient relational transaction tree database, construct index clusters, and eliminate N+1 query patterns.",
        targetTier: "mid-level",
        specialtyTag: "backend",
        pointsWorth: 40,
        unlockDay: 2,
        status: "in_progress"
    },
    {
        id: "tsk-m3",
        title: "Containerizing Complex Applications with Multi-Stage Docker",
        description: "Write production-grade multi-stage Dockerfiles optimizing builds for a distributed SPA application to drop image footprint down below 50MB.",
        targetTier: "mid-level",
        specialtyTag: "devops",
        pointsWorth: 45,
        unlockDay: 3,
        status: "locked"
    },

    // === EXPERIENCED TIER TASKS (Days 1 - 3) ===
    {
        id: "tsk-e1",
        title: "Distributed Architecture & Event-Driven Message Brokers",
        description: "Design an asynchronous background checkout ordering stream system connecting distinct isolated instances utilizing Redis Pub/Sub channels.",
        targetTier: "experienced",
        specialtyTag: "backend",
        pointsWorth: 80,
        unlockDay: 1,
        status: "passed"
    },
    {
        id: "tsk-e2",
        title: "Automated Blue/Green Deployments with AWS & Terraform",
        description: "Provision fully isolated cloud infrastructure structures using declarative IaC variables, managing secure connection load balancers cleanly.",
        targetTier: "experienced",
        specialtyTag: "devops",
        pointsWorth: 100,
        unlockDay: 2,
        status: "available"
    },
    {
        id: "tsk-e3",
        title: "Micro-Frontend Federation Core Integration",
        description: "Build an decoupled app routing shell architecture resolving runtime modular chunk dependencies cleanly across microservice dashboards.",
        targetTier: "experienced",
        specialtyTag: "frontend",
        pointsWorth: 95,
        unlockDay: 3,
        status: "locked"
    }
];
