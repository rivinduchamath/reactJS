const _ = require('lodash');

export function TransformTreeData(ruleObj) {
  function processComposition(comp) {
    let str = '';
    let conj = '';
    if (comp.conj) {
      conj = comp.conj;
      str += '(';
    }
    if (comp.children) {
      str += processChildren(comp.children, conj);
      str += ')';
    }
    return str;
  }

  function processChildren(children, conj) {
    const childResultArr = [];
    children.forEach((child) => {
      if (child.conj) {
        childResultArr.push(processComposition(child));
      } else {
        childResultArr.push(processCondition(child));
      }
    });
    return childResultArr.join(` ${conj} `);
  }

  function processCondition(cond) {
    // return `(${cond.fact?.value} ${cond.operator} ${
    //   _.isString(cond.value) ? `"${cond.value}"` : cond.value
    // })`;
    return `(${cond.fact?.value} ${cond.operator} ${cond.value})`;
  }

  return processComposition(ruleObj);
}

// format rules for drools
export function GetDroolsFormat(data) {
  const ruleArr = [];
  data.rule.forEach((r) => {
    const droolsFormat = {};
    droolsFormat.name = r.ruleId.name;
    droolsFormat.condition = TransformTreeData(r.ruleId.rule);

    droolsFormat.event = `${r.contentKey.value}("${r.contentId.fields.heroBanner['en-US']}")`;
    ruleArr.push(droolsFormat);
  });
  data.rule = ruleArr;
  return data;
}
