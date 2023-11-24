export const MedicalRecomendationTemplate: string = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap" rel="stylesheet">
<div class="medical-recomendation-container"
    style="width: 100%; height: 100%; font-family: 'Arial, sans-serif'; color: black">
    <div class="heading"
        style="width: 100%; display: flex; align-items: center; flex-direction: column; margin-bottom: 20px;">
        <img src="../../../../../assets/logo.png" alt="" style="width: 100px; height: 100px;">
        <h1 style="font-weight: bold; font-family: 'Poppins', sans-serif; color: #0066ff;">Health Harmony</h1>
        <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{CLINIC_NAME}}</p>
        <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{CLINIC_EMAIL}}</p>
        <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{CLINIC_PHONE_NUMBER}}</p>
    </div>
    <div class="patient-and-doctor-data"
        style="display: flex; width: 100%; margin-bottom: 20px; justify-content: space-between;">
        <div class="patient-container" style="flex: 1">
            <h2 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Patient</h2>
            <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{PATIENT_NAME}}</p>
            <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Pesel: {{PATIENT_PESEL}}</p>
            <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Birth date: {{PATIENT_BIRTH_DATE}}</p>
            <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{PATIENT_EMAIL}}</p>
            <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{PATIENT_PHONE_NUMBER}}</p>
        </div>
        <div class="doctor-container" style="flex: 1; display: flex; justify-content: flex-end;">
            <div>
                <h2 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Doctor</h2>
                <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{DOCTOR_NAME}}</p>
                <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{DOCTOR_SPECIALIZATIONS}}</p>
                <p style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{DOCTOR_EMAIL}}</p>
            </div>
        </div>
    </div>
    <div class="description" style="margin-bottom: 20px;">
        <h2 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Visit description</h2>
        <p style="text-align: justify;">
            {{VISIT_DESCRIPTION}}
        </p>
    </div>
    <div class="medical-list">
        <h2 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">Medical recomendation</h2>
        {{MEDICINES_LIST}}
    </div>
    <div class="footer"
        style="width: 100%; display: flex; align-items: flex-end; flex-direction: column;">
        <div style="display: flex; flex-direction: column; align-items: center;">
            <h2 style="font-family: 'Arial, sans-serif'; margin-bottom: 5px;">{{DOCTOR_NAME}}</h2>
            <p>.........................................................</p>
        </div>
    </div>
</div>
`