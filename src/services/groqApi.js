// Groq API Service for DPR Generation
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate DPR content using Groq API
 * @param {Object} formData - The form data from CreateDPR component
 * @param {string} pdfText - Optional extracted text from PDF document
 * @returns {Promise<Object>} Generated DPR content
 */
export const generateDPRWithGroq = async (formData, pdfText = null) => {
  try {
    let prompt = '';
    
    if (pdfText) {
      // If PDF text is provided, use it as the primary source
      prompt = `Generate a comprehensive Detailed Project Report (DPR) for the Government of Rajasthan based on the following project planning document:

PROJECT PLANNING DOCUMENT CONTENT:
${pdfText}

ADDITIONAL PROJECT DETAILS (if provided):
Project Title: ${formData.projectTitle || 'Extract from document'}
Project Type: ${formData.projectType || 'Extract from document'}
Department: ${formData.department || 'Extract from document'}
Project Code: ${formData.projectCode || 'Auto-generate'}
District: ${formData.district || 'Extract from document'}
Tehsil: ${formData.tehsil || 'Extract from document'}
Village: ${formData.village || 'Extract from document'}
Budget: ${formData.budget || 'Extract from document'}
Timeline: ${formData.timeline || 'Extract from document'} months

IMPORTANT: Expand and formalize all brief inputs into proper government document language. If the document contains brief notes or informal language, transform them into formal, comprehensive descriptions suitable for government documentation.

Please analyze the uploaded project planning document and extract all relevant information to generate a comprehensive DPR. Expand any brief inputs into formal government document language. If any information is missing in the document, use the additional details provided above and generate appropriate content.`;
    } else {
      // Original prompt for manual entry
      prompt = `Generate a comprehensive Detailed Project Report (DPR) for the Government of Rajasthan based on the following information:

Project Details:
- Project Title: ${formData.projectTitle || 'N/A'}
- Project Type: ${formData.projectType || 'N/A'}
- Department: ${formData.department || 'N/A'}
- Project Code: ${formData.projectCode || 'N/A'}

Site & Location:
- District: ${formData.district || 'N/A'}
- Tehsil: ${formData.tehsil || 'N/A'}
- Village: ${formData.village || 'N/A'}
- Coordinates: ${formData.coordinates || 'N/A'}

Existing Infrastructure:
${formData.existingInfrastructure || 'N/A'}

Current Status:
${formData.currentStatus || 'N/A'}

Proposed Technical Details:
- Technical Specifications: ${formData.technicalSpecs || 'N/A'}
- Materials Required: ${formData.materials || 'N/A'}
- Equipment Required: ${formData.equipment || 'N/A'}

Implementation Details:
- Timeline: ${formData.timeline || 'N/A'} months
- Estimated Budget: ₹${formData.budget || 'N/A'}
- Funding Source: ${formData.fundingSource || 'N/A'}

IMPORTANT: The user may have provided brief, informal inputs. You MUST expand and formalize ALL inputs into proper government document language.

For example:
- If Project Title is just "water plant", expand it to "Construction and Commissioning of Water Treatment Plant for [Location]"
- If Project Background is "start from 0" or "have to start from 0", write: "This is a greenfield project requiring complete development from the ground up. The project site currently lacks any existing infrastructure and necessitates comprehensive site preparation, foundation work, and installation of all necessary facilities and utilities."
- If Existing Infrastructure is "nothing is there", write: "There is no existing infrastructure at the project site. The area requires complete development including land preparation, utility connections, and establishment of all project-related facilities."
- If Technical Specifications are brief like "33mm pipes under 2 meter deep", expand to: "The project requires installation of 33mm diameter pipes at a minimum depth of 2 meters below ground level, ensuring adequate protection from surface loads, vehicular traffic, and environmental factors. The pipe installation shall comply with IS standards for water supply systems."
- If Materials Required is "iron pipes only", expand to: "The project requires the use of iron pipes exclusively, conforming to IS standards. All pipes must be of specified grade and dimensions, with appropriate protective coatings to ensure durability and longevity."
- If Equipment Required is a simple list, expand each item with specifications and purpose.

For any field showing "N/A", generate appropriate content based on the project context.

Please generate a professional, detailed DPR document in JSON format with the following structure:
{
  "executiveSummary": "Comprehensive executive summary (expand brief inputs into full paragraphs)",
  "projectBackground": "Detailed background information (expand brief inputs like 'start from 0' into formal descriptions)",
  "projectObjectives": ["Objective 1", "Objective 2", ...],
  "scopeOfWork": "Detailed scope of work (expand N/A or brief inputs into comprehensive descriptions)",
  "technicalSpecifications": "Comprehensive technical specifications (expand brief technical notes into formal specifications)",
  "implementationPlan": "Step-by-step implementation plan (generate if N/A)",
  "budgetBreakdown": {
    "materials": "Detailed cost breakdown for materials",
    "labor": "Detailed cost breakdown for labor",
    "equipment": "Detailed cost breakdown for equipment",
    "other": "Other costs including contingencies"
  },
  "timeline": "Detailed timeline with milestones",
  "riskAssessment": "Comprehensive risk assessment and mitigation strategies (generate if N/A)",
  "expectedOutcomes": "Expected outcomes and benefits (generate if N/A)",
  "sustainability": "Sustainability measures and environmental considerations",
  "materialsRequired": "Detailed list of materials required (expand brief inputs into formal descriptions)",
  "equipmentRequired": "Detailed list of equipment required (expand brief inputs into formal descriptions)",
  "existingInfrastructure": "Description of existing infrastructure (expand brief inputs like 'nothing is there' into formal descriptions)"
}

CRITICAL REQUIREMENTS:
1. All text fields (executiveSummary, projectBackground, scopeOfWork, technicalSpecifications, implementationPlan, riskAssessment, expectedOutcomes, sustainability) MUST be STRINGS, not objects or nested structures.
2. Each field should contain complete, formal sentences suitable for government documentation.
3. Do NOT create nested objects within text fields - use plain text strings only.
4. Do NOT simply copy the brief inputs - EXPAND and FORMALIZE them into proper government document language.
5. For arrays like projectObjectives, use simple string arrays: ["Objective 1", "Objective 2"]`;
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are an expert technical writer specializing in creating Detailed Project Reports (DPRs) for government infrastructure projects in Rajasthan, India. 

CRITICAL INSTRUCTIONS:
1. EXPAND AND FORMALIZE: The user may provide brief, informal inputs (like "water plant", "start from 0", "nothing is there"). You MUST expand these into proper, formal government document language.

2. EXAMPLES OF TRANSFORMATIONS:
   - "water plant" → "Construction and Commissioning of Water Treatment Plant"
   - "start from 0" → "The project site currently lacks any existing infrastructure. This is a greenfield project that requires complete development from the ground up, including site preparation, foundation work, and installation of all necessary facilities."
   - "nothing is there" → "There is no existing infrastructure at the project site. The area requires complete development including land preparation, utility connections, and establishment of all project-related facilities."
   - "33mm pipes under 2 meter deep" → "The project requires installation of 33mm diameter pipes at a minimum depth of 2 meters below ground level, ensuring protection from surface loads and environmental factors."

3. GOVERNMENT DOCUMENT STYLE:
   - Use formal, professional language
   - Write complete, grammatically correct sentences
   - Use proper technical terminology
   - Structure content in paragraphs, not bullet points (unless specifically requested)
   - Maintain consistency with government documentation standards

4. FILL MISSING SECTIONS: If any section shows "N/A", generate appropriate content based on the project context and other provided information.

5. COMPREHENSIVE DETAILS: Expand brief inputs into detailed, comprehensive descriptions suitable for official government documentation.

Generate comprehensive, professional, and well-structured DPRs that meet government documentation standards.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || '';

    // Try to parse JSON from the response
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = generatedContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : generatedContent;
      const parsedDPR = JSON.parse(jsonString);
      return { success: true, dpr: parsedDPR, rawContent: generatedContent };
    } catch (parseError) {
      // If JSON parsing fails, return the raw content
      return { success: true, dpr: null, rawContent: generatedContent };
    }
  } catch (error) {
    console.error('Error generating DPR with Groq:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to generate DPR',
      dpr: null 
    };
  }
};

