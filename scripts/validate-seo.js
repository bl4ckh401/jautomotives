#!/usr/bin/env node

/**
 * SEO Validation Script
 * Run this to validate all SEO fixes are working correctly
 */

const https = require('https');
const http = require('http');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jabaautomotives.com';

const tests = {
  passed: [],
  failed: [],
  warnings: []
};

console.log('🔍 Starting SEO Validation...\n');

// Check if robots.txt is accessible
function checkRobotsTxt() {
  return new Promise((resolve) => {
    const url = `${SITE_URL}/robots.txt`;
    console.log(`Checking robots.txt: ${url}`);
    
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          if (data.includes('jabaautomotives.com')) {
            tests.passed.push('✅ robots.txt accessible and contains correct domain');
          } else {
            tests.failed.push('❌ robots.txt does not contain correct domain');
          }
        } else {
          tests.failed.push(`❌ robots.txt returned status ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      tests.failed.push(`❌ robots.txt error: ${err.message}`);
      resolve();
    });
  });
}

// Check if sitemap.xml is accessible
function checkSitemap() {
  return new Promise((resolve) => {
    const url = `${SITE_URL}/sitemap.xml`;
    console.log(`Checking sitemap: ${url}`);
    
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const urlCount = (data.match(/<url>/g) || []).length;
          tests.passed.push(`✅ sitemap.xml accessible with ${urlCount} URLs`);
        } else {
          tests.failed.push(`❌ sitemap.xml returned status ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      tests.failed.push(`❌ sitemap.xml error: ${err.message}`);
      resolve();
    });
  });
}

// Print results
async function runTests() {
  await checkRobotsTxt();
  await checkSitemap();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(50) + '\n');
  
  if (tests.passed.length > 0) {
    console.log('✅ PASSED TESTS:');
    tests.passed.forEach(test => console.log(`   ${test}`));
    console.log('');
  }
  
  if (tests.failed.length > 0) {
    console.log('❌ FAILED TESTS:');
    tests.failed.forEach(test => console.log(`   ${test}`));
    console.log('');
  }
  
  if (tests.warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    tests.warnings.forEach(test => console.log(`   ${test}`));
    console.log('');
  }
  
  console.log('='.repeat(50));
  console.log(`Total: ${tests.passed.length} passed, ${tests.failed.length} failed, ${tests.warnings.length} warnings`);
  console.log('='.repeat(50) + '\n');
  
  if (tests.failed.length === 0) {
    console.log('🎉 All tests passed! Your SEO configuration looks good.\n');
    console.log('Next steps:');
    console.log('1. Deploy these changes to production');
    console.log('2. Submit sitemap to Google Search Console');
    console.log('3. Request indexing for key pages');
    console.log('4. Monitor GSC for improvements over next 2-4 weeks\n');
  } else {
    console.log('⚠️  Some tests failed. Please review and fix the issues above.\n');
  }
}

runTests().catch(console.error);
