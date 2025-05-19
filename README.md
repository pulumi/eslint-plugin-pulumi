# @pulumi/eslint-plugin

A simple eslint plugin for the Pulumi Node SDK.

## Motivation

Because Pulumi generates several nontrivial types, and those types often have some nontrivial semantics backing them, it can be the case where some idioms have been implemented to help prevent footgunning. Rather than allowing those footguns to occur, it seems better to point them out and (where possible) offer helpful advice to prevent them as early as possible. Thankfully, ESLint and TypeScript offer a very early escape hatch for this sort of thing, and so this plugin was born.

## Installation

Install this plugin by simply importing it and adding it to your `eslint.config.*` file:

```
import pulumi from '@pulumi/eslint-plugin'

export default [
  {
    plugins: pulumi,
  },
  ...
]
```

## Examples

### no-output-in-template-literal

This rule is intended to prevent objects of type `pulumi.Output<T>` from appearing in template strings. It seems obvious that if we have an `Output<string>` that template interpolation would work out of the box, but we can't rely on that value to be set at the time the interpolation occurs. In this case, we provide the `pulumi.interpolate` template tag to ensure the `Output` value is resolved correctly.

Invalid:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myBucket = new aws.s3.Bucket("myBucket");
const bucketArn = myBucket.arn;
const someInterpolatedString = `${bucketArn}`;
```

Valid:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const myBucket = new aws.s3.Bucket("myBucket");
const bucketArn = myBucket.arn;
const someInterpolatedString = pulumi.interpolate`${bucketArn}`;
```

### no-output-instance-in-template-literal

This rule is very similar to `no-output-in-template-literal`, and is intended to prevent objects of type `pulumi.OutputInstance<T>` from appearing in template strings.

Invalid:

```typescript
import * as pulumi from "@pulumi/pulumi";

const outputInstance: pulumi.OutputInstance<number> = pulumi.output([
  1, 2, 3,
])[0];
const someInterpolatedString = `${outputInstance}`;
```

Valid:

```typescript
import * as pulumi from "@pulumi/pulumi";

const outputInstance: pulumi.OutputInstance<number> = pulumi.output([
  1, 2, 3,
])[0];
const someInterpolatedString = pulumi.interpolate`${outputInstance}`;
```

## Contributing

Adding a rule is meant to be as simple as possible. For any check we want to make, it's likely best to build a simple example in [AST Explorer](https://astexplorer.net/) first. Then, determine the rules governing the node which breaks the rule we want to implement. From that point, we can use the helper `ESLintUtils.RuleCreator` to handle much of the boilerplate needed to build our new rule. Many of the patterns used from there are visible in the [`no-output-in-template-literal`](./src/noOuputInTemplateLiteral.ts#13) rule. From there, register the new rule in [index.ts](src/index.ts), and write a new test suite in [tests](tests/). See [example](tests/noOutputInTemplateLiteral.spec.ts).
