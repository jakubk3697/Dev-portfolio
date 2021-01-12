/* eslint-disable require-jsdoc */
export function markdownRenderer(targetConstructor) {
  targetConstructor.prototype.renderMarkdown = (content) => `
        <mark-down>
            ${content}
        </mark-down>
    `;
}
