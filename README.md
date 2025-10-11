# 🏥 HealthForge — AI-Powered Healthcare Companion

<p align="center">
  <a href="https://kotlinlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/Mobile%20App-Kotlin%20%26%20Compose-B84E8D?style=for-the-badge&logo=kotlin&logoColor=white" alt="Mobile Frontend: Kotlin & Jetpack Compose">
  </a>
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Web%20App-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Web Frontend: Next.js">
  </a>
  <a href="https://firebase.google.com/" target="_blank">
    <img src="https://img.shields.io/badge/Backend-Firebase%20%2F%20MERN-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Backend: Firebase / MERN">
  </a>
</p>

---

## 📘 Overview

**HealthForge** is a next-generation **AI-powered healthcare application** designed to support patients immediately after hospital discharge and throughout their entire recovery journey. It is deployed as both a **mobile app** and a **web application**.

It generates **personalized, adaptive care plans** and dynamic, region-specific **Indian diet recommendations** using Generative AI, ensuring that patients receive the right care, at the right time, in the right way.

By combining AI-driven recovery management, smart nutrition planning (via **NutriAI**), and real-time health analytics, HealthForge empowers patients to recover confidently while keeping doctors informed and engaged.

---

## 🎯 Problem Statement

Patients discharged from hospitals often:

* Receive static care instructions that don’t automatically adapt to their changing health status.
* Struggle with diet planning, medicine tracking, and synthesizing post-discharge guidance.
* Lack real-time support or reminders, increasing the risk of hospital **readmissions**.
* Existing health apps fail to provide **personalized, AI-based recovery and nutrition management** tailored specifically to **Indian users**.

---

## ✅ Solution

HealthForge provides a Generative AI–driven healthcare companion app that:

* Analyzes medical reports and history to generate **adaptive recovery and diet plans**.
* Offers a **multilingual AI health assistant** for instant guidance.
* Tracks progress, alerts users, and **updates plans dynamically**.
* Ensures affordable, fully **Indianized diet plans** via the integrated **NutriAI** module.

---

## 🚀 Core Modules & Features

### 🧠 1. Generative AI Care Plan
* Scans uploaded medical reports and doctor notes.
* Generates a personalized post-discharge plan (diet, medicine, rest, lifestyle).
* **Updates dynamically** when new symptoms or vitals are reported.

### ✅ 2. Interactive Daily Checklist
* Displays care tasks in a simple, **actionable checklist**.
* Tracks progress and motivates adherence with completion streaks.

### 🍛 3. NutriAI — Smart Indian Diet Coach
* **AI-powered dynamic nutrition module** built to create **disease-specific, regional, and affordable Indian meal plans**.
* Adapts to local ingredients, budget, and cultural preferences.
* Uses food photo recognition and provides smart substitutions.

### 🗣️ 4. AI + Voice Health Assistant
* Conversational chatbot trained on medical knowledge.
* Supports **multilingual voice and text** interactions.
* Explains recommendations (e.g., *“Your sugar levels improved by 10%, great progress!”*).

### 🔔 5. Smart Notifications
* Automated, reliable reminders for medicine, hydration, meals, and follow-ups.
* Uses **Android WorkManager/AlarmManager** for mobile scheduling.

### 📊 6. Health Analytics Dashboard
* Visualizes progress through charts and trend graphs.
* Tracks daily compliance, vitals, and lifestyle changes.

---

## 🛠 System Workflow

1.  **User Authentication** → via Firebase Auth / MERN Stack.
2.  **Profile Setup** → Health data (age, gender, condition, history).
3.  **Report Upload** → Patient uploads reports or discharge summaries via App/Web.
4.  **AI Engine Processing** → NLP model analyzes and generates a plan.
5.  **Plan Generation** → Stored in Firestore / MongoDB with dynamic tasks.
6.  **Daily Checklist & Reminders** → Shown in App/Web with smart notifications.
7.  **AI Assistant Interaction** → Real-time chatbot/voice support.
8.  **Analytics Dashboard** → Displays recovery and compliance metrics.

---

## 🧩 Tech Stack

| Component | Technology Used |
| :--- | :--- |
| **Mobile Frontend** | Android (Kotlin + Jetpack Compose) |
| **Web Frontend** | Next.js |
| **Primary Backend** | **MERN Stack** (MongoDB, Express, React/Next, Node.js) |
| **Secondary Backend** | Firebase (Auth, Firestore, Cloud Storage) |
| **AI Engine** | Transformer-based Generative AI (NLP) |
| **Notifications (Mobile)** | Android WorkManager / AlarmManager |
| **Database** | **MongoDB (MERN)** / Firebase Firestore |
| **Chatbot / Voice Assistant** | GPT / Gemini-based Conversational AI |
| **Nutrition Module** | **NutriAI** – AI meal planner integrated with regional food DB |

### 📈 Data Flow Overview
```mermaid
graph TD
    subgraph Frontend
        A[Patient Uploads Report/Symptoms]
        B(App / Web)
    end
    
    subgraph Backend & AI
        C(AI Engine: Generates Plan)
    end
    
    subgraph Database
        D(Database: Stores Care Plan + Progress)
    end

    A --> B;
    B --> C;
    C --> D;
    D --> B;
    B --> E(Analytics Dashboard);
    B --> F(AI Assistant);
    F <--> A;
    B --> G(Notification Service: Sends Reminders);
    G --> A;
