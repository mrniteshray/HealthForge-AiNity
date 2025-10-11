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

**HealthForge** is a next-generation **AI-powered healthcare application** designed to support patients immediately after hospital discharge and throughout their recovery journey. It’s available as both a **mobile app** and a **web application**.

It generates **personalized, adaptive care plans** and region-specific **Indian diet recommendations** using Generative AI, ensuring that patients receive the right care, at the right time, in the right way.

By combining AI-driven recovery management, smart nutrition planning (**NutriAI**), and real-time health analytics, HealthForge empowers patients to recover confidently while keeping doctors informed and engaged.

---

## 🎯 Problem Statement

Patients discharged from hospitals often:

* Receive static care instructions that don’t adapt to changing health conditions.
* Struggle with diet planning, medicine tracking, and synthesizing post-discharge advice.
* Lack real-time support, leading to **avoidable readmissions**.
* Existing health apps fail to offer **personalized AI-based recovery and nutrition management** tailored to **Indian users**.

---

## ✅ Solution

HealthForge offers a **Generative AI–driven healthcare companion** that:

* Analyzes reports and medical history to generate **adaptive care plans**.
* Provides **AI voice + chat assistance** in multiple languages.
* Dynamically updates plans based on real-time inputs.
* Ensures **affordable Indianized diet plans** via **NutriAI**.

---

## 🚀 Core Modules & Features

### 🧠 1. Generative AI Care Plan
* Scans uploaded reports and doctor notes.
* Creates personalized recovery plans (diet, medicine, lifestyle).
* **Dynamically updates** when new vitals or symptoms appear.

---

### ✅ 2. Interactive Daily Checklist
* Converts plans into **simple daily tasks**.
* Tracks completion progress.
* Uses streaks and rewards for motivation.

---

### 🗣️ 3. AI + Voice Health Assistant
* Conversational assistant trained on verified medical data.
* Works in **multiple Indian languages**.
* Offers **contextual guidance** (“Your sugar levels improved by 10%, great job!”).

---

### 🔔 4. Smart Notifications
* Reminders for medicines, hydration, meals, and follow-ups.
* Implemented using **Android WorkManager / AlarmManager**.
* Customizable frequency and tone.

---

### 📊 5. Health Analytics Dashboard
* Interactive visual dashboard to track progress.
* Displays vitals, compliance, and improvement trends.

---
 🧑‍🤝‍🧑 6. CareConnect — Guardians & Guardees Network

**CareConnect** connects patients (Guardees) with their caregivers, family, or friends (Guardians) — making recovery collaborative and secure.
**Features:**
* 👥 **Your Health Network:** View connected guardians and guardees.  
* ➕ **Add Guardians/Guardees:** Invite via email through an interactive “+ Add” popup modal.  
* 🧾 **Guardian Cards:** Show total number of guardians and guardees.  
* 🕒 **Activity History:**  
  * *My Guardians* — View support received and shared updates.  
  * *People I’m Guarding* — Track the health and activity of others you help.  
* 🔔 **Instant Alerts:** Guardians receive updates if a guardee misses medicine or reports new symptoms.  
* 🔒 **Secure Access:** Only verified guardians can access shared insights.

---
 🍽️ 7. DietBuddy — Social Nutrition Tracker

**Features:**
* 🤖 **AI Nutrition Pairing:** Connect with users having similar health goals.  
* 📸 **Meal Sharing:** Upload food photos, get instant AI feedback.   
* 💬 **Motivational Feed:** Like, comment, and share healthy choices.   
* 🩺 **Integrated Insights:** Syncs with NutriAI to reflect nutrition score in health analytics.

---

## 🛠 System Workflow

1.  **User Authentication** → Firebase / MERN Auth.  
2.  **Profile Setup** → Basic health info (age, condition, history).  
3.  **Report Upload** → Upload reports or discharge summaries.  
4.  **AI Engine Processing** → NLP analyzes and generates plan.  
5.  **Plan Storage** → Saved in Firestore / MongoDB.  
6.  **Checklist & Notifications** → Daily care tasks and reminders.  
7.  **AI Assistant** → Real-time chat/voice-based guidance.  
8.  **Analytics Dashboard** → Recovery insights visualized.  
9.  **CareConnect + DietBuddy** → Network and nutrition collaboration.

---

## 📈 Data Flow Overview

```mermaid
graph TD
    A[Patient Uploads Report/Symptoms] --> B(App / Web)
    B --> C(AI Engine: NLP Analysis)
    C --> D{Care Plan Generation}
    D --> E[Database: Firestore / MongoDB]
    E --> F[Daily Checklist & Notifications]
    E --> G[Health Analytics Dashboard]
    G --> H[AI Assistant]
    E --> I[CareConnect Module]
    E --> J[DietBuddy / NutriAI]
    I <--> K[Guardians & Guardees Network]
    J <--> L[Social Nutrition Feed]
