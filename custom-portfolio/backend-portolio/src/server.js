const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'company.json');

const defaultProfile = {
  name: 'Jenny Creative Studio',
  about:
    'Boutique fashion collective crafting contemporary portraits and immersive editorial experiences for bold brands.',
  whyChoose:
    'We obsess over narrative-rich visuals, fast delivery, and a collaborative process that keeps clients confident from brief to final frame.'
};

function ensureDataStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultProfile, null, 2));
  }
}

function readCompanyProfile() {
  ensureDataStore();
  try {
    const fileContents = fs.readFileSync(DATA_FILE, 'utf-8');

    if (!fileContents.trim()) {
      throw new Error('Empty data file');
    }

    return JSON.parse(fileContents);
  } catch (error) {
    console.warn('Invalid company profile data, resetting to defaults:', error.message);
    writeCompanyProfile(defaultProfile);
    return { ...defaultProfile };
  }
}

function writeCompanyProfile(payload) {
  ensureDataStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2));
}

function pickFirstDefined(source, keys) {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key) && source[key] !== undefined) {
      return source[key];
    }
  }
  return undefined;
}

app.use(cors());
app.use(express.json());

app.get('/api/company', (_req, res) => {
  const companyProfile = readCompanyProfile();
  res.json(companyProfile);
});

app.put('/api/company', (req, res) => {
  const payload = req.body || {};

  const name = pickFirstDefined(payload, ['name', 'Name', 'companyName', 'Company Name']);
  const about = pickFirstDefined(payload, ['about', 'About', 'aboutCompany', 'About company']);
  const whyChoose = pickFirstDefined(payload, ['whyChoose', 'Why choose', 'whyChooseUs', 'why']);

  if (name === undefined && about === undefined && whyChoose === undefined) {
    return res.status(400).json({
      message: 'Please provide at least one field: name, about, or whyChoose'
    });
  }

  const companyProfile = readCompanyProfile();
  const updatedProfile = {
    name: name ?? companyProfile.name,
    about: about ?? companyProfile.about,
    whyChoose: whyChoose ?? companyProfile.whyChoose
  };

  writeCompanyProfile(updatedProfile);

  res.json({
    message: 'Company profile updated successfully',
    data: updatedProfile
  });
});

app.listen(PORT, () => {
  console.log(`Company profile API ready on http://localhost:${PORT}`);
});
