const blanksGeneratorKeywords = (blank, tokens = []) => {
  let switchDepth = 0;
  return {
    AwaitExpression(node, state) {
      tokens.add("await");
      state.write(blank + " ");
      const argument = node.argument;
      if (argument != null) {
        this[argument.type](argument, state);
      }
    },
    BreakStatement(node, state) {
      tokens.add("break");
      state.write(blank + " ");
      if (node.label) {
        this.Identifier(node.label, state);
      }
    },
    ClassDeclaration(node, state) {
      tokens.add("class");
      state.write(blank + " ");
      if (node.id) {
        this.Identifier(node.id, state);
      }
      state.write(" ");
      if (node.superClass) {
        tokens.add("extends");
        state.write(blank + " ");
        this[node.superClass.type](node.superClass, state);
        state.write(" ");
      }
      if (node.body) {
        this.ClassBody(node.body, state);
      }
    },
    ClassExpression(node, state) {
      tokens.add("class");
      state.write(blank + " ");
      if (node.id) {
        this.Identifier(node.id, state);
        state.write(" ");
      }
      if (node.superClass) {
        tokens.add("extends");
        state.write(blank + " ");
        this[node.superClass.type](node.superClass, state);
        state.write(" ");
      }
      if (node.body) {
        this.ClassBody(node.body, state);
      }
    },
    ContinueStatement(node, state) {
      tokens.add("continue");
      state.write(blank + " ");
      if (node.label) {
        this.Identifier(node.label, state);
      }
    },
    DebuggerStatement(node, state) {
      tokens.add("debugger");
      state.write(blank + " ");
    },
    DoWhileStatement(node, state) {
      tokens.add("do");
      state.write(blank + " ");
      this[node.body.type](node.body, state);
      state.write(" " + blank + " (");
      this[node.test.type](node.test, state);
      state.write("); ");
    },

    ForOfStatement(node, state) {
      tokens.add("for", "of");
      state.write(blank + " (");
      this[node.left.type](node.left, state);
      if (state.output[state.output.length - 1] === ";") {
        state.output = state.output.slice(0, state.output.length - 1);
      }
      state.write(" " + blank + " ");
      this[node.right.type](node.right, state);
      state.write(") ");
      if (node.body) {
        this[node.body.type](node.body, state);
      }
    },
    ForStatement(node, state) {
      tokens.add("for");
      state.write(blank + " (");
      if (node.init) {
        this[node.init.type](node.init, state);
        state.write(" ");
      } else {
        state.write(" ;");
      }
      if (node.test) {
        this[node.test.type](node.test, state);
        state.write(" ");
      } else {
        state.write(" ;");
      }
      if (node.update) {
        this[node.update.type](node.update, state);
      } else {
        state.write(" ;");
      }
      state.write(") ");
      if (node.body) {
        this[node.body.type](node.body, state);
      }
    },
    FunctionDeclaration(node, state) {
      tokens.add(node.generator ? "function*" : "function");
      state.write(blank + " ");
      if (node.id) {
        this.Identifier(node.id, state);
      }
      state.write(" (");
      for (const param of node.params) {
        this[param.type](param, state);
      }
      state.write(") ");
      if (node.body) {
        this.ClassBody(node.body, state);
      }
    },
    FunctionExpression(node, state) {
      tokens.add(node.generator ? "function*" : "function");
      state.write(blank + " ");
      if (node.id) {
        this.Identifier(node.id, state);
        state.write(" ");
      }
      state.write("(");
      for (const param of node.params) {
        this[param.type](param, state);
      }
      state.write(") ");
      if (node.body) {
        this.ClassBody(node.body, state);
      }
    },
    IfStatement(node, state) {
      tokens.add("if");
      state.write(blank + " (");
      this[node.test.type](node.test, state);
      state.write(") ");
      if (node.consequent) {
        this[node.consequent.type](node.consequent, state);
      }
      if (node.alternate) {
        tokens.add("else");
        state.write(" " + blank + " ");
        this[node.alternate.type](node.alternate, state);
      }
    },
    NewExpression(node, state) {
      tokens.add("new");
      state.write(blank + " ");
      this[node.callee.type](node.callee, state);
      state.write("(");
      for (const argument of node.arguments) {
        this[argument.type](argument, state);
      }
      state.write(")");
    },
    ReturnStatement(node, state) {
      tokens.add("return");
      state.write(blank + " ");
      const argument = node.argument;
      if (argument != null) {
        this[argument.type](argument, state);
      }
    },
    Super(node, state) {
      tokens.add("super");
      state.write(blank + " ");
    },
    SwitchCase(node, state) {
      const indent = Array(switchDepth).fill("  ");
      tokens.add(node.test ? "case" : "default");
      if (node.test) {
        state.write(indent + blank + " ");
        this[node.test.type](node.test, state);
      } else {
        state.write(indent + blank);
      }
      state.write(":");
      for (const consequent of node.consequent) {
        state.write("\n");
        this[consequent.type](consequent, state);
      }
    },
    SwitchStatement(node, state) {
      tokens.add("switch");
      state.write(blank + " (");
      this[node.discriminant.type](node.discriminant, state);
      state.write(") {");
      switchDepth++;
      for (const switchCase of node.cases) {
        state.write("\n");
        this[switchCase.type](switchCase, state);
      }
      switchDepth--;
      state.write("\n}");
    },
    ThisExpression(node, state) {
      tokens.add("this");
      state.write(blank);
    },
    ThrowStatement(node, state) {
      tokens.add("throw");
      state.write(blank + " ");
      const argument = node.argument;
      if (argument != null) {
        this[argument.type](argument, state);
      }
    },
    TryStatement(node, state) {
      tokens.add("try");
      state.write(blank + " ");
      this[node.block.type](node.block, state);
      if (node.handler) {
        this[node.handler.type](node.handler, state);
      }
      if (node.finalizer) {
        tokens.add("finally");
        state.write(" " + blank + " ");
        this[node.finalizer.type](node.finalizer, state);
      }
    },
    CatchClause(node, state) {
      tokens.add("catch");
      state.write(" " + blank + " (");
      this[node.param.type](node.param, state);
      state.write(") ");
      this[node.body.type](node.body, state);
    },
    VariableDeclaration(node, state) {
      tokens.add(node.kind);
      state.write(blank + " ");
      for (const declaration of node.declarations) {
        this[declaration.type](declaration, state);
      }
    },
    WhileStatement(node, state) {
      tokens.add("while");
      state.write(blank + "  (");
      this[node.test.type](node.test, state);
      state.write(") ");
      if (node.body) {
        this[node.body.type](node.body, state);
      }
    },
    WithStatement(node, state) {
      tokens.add("with");
      state.write(blank + "  (");
      this[node.object.type](node.object, state);
      state.write(") ");
      if (node.body) {
        this[node.body.type](node.body, state);
      }
    },
    YieldExpression(node, state) {
      tokens.add("yield");
      state.write(blank + " ");
      const argument = node.argument;
      if (argument != null) {
        this[argument.type](argument, state);
      }
    },
  };
};

// should have but ?blanks doesn't yet support modules
// + ExportAllDeclaration: ?? ExportAllDeclaration(node, state)
// + ExportDefaultDeclaration: ?? ExportDefaultDeclaration( node, state )
// + ExportNamedDeclaration: ?? ExportNamedDeclaration(node, state)
// + ImportDeclaration: ?? ImportDeclaration(node, state)

// - ArrayExpression: ?? ArrayExpression( node, state )
// - ArrayPattern: ?? ArrayExpression( node, state )
// - ArrowFunctionExpression: ?? ArrowFunctionExpression( node, state )
// - AssignmentExpression: ?? AssignmentExpression(node, state)
// - AssignmentPattern: ?? AssignmentPattern(node, state)
// - BinaryExpression: ?? BinaryExpression( node, state )
// - BlockStatement: ?? BlockStatement( node, state )
// - CallExpression: ?? CallExpression(node, state)
// - ClassBody: ?? BlockStatement( node, state )
// - ConditionalExpression: ?? ConditionalExpression(node, state)
// - EmptyStatement: ?? EmptyStatement(node, state)
// - ExpressionStatement: ?? ExpressionStatement(node, state)
// - Identifier: ?? Identifier(node, state)
// - LabeledStatement: ?? LabeledStatement(node, state)
// - Literal: ?? Literal(node, state)
// - LogicalExpression: ?? BinaryExpression( node, state )
// - MemberExpression: ?? MemberExpression(node, state)
// - MetaProperty: ?? MetaProperty(node, state)
// - MethodDefinition: ?? MethodDefinition(node, state)
// - ObjectExpression: ?? ObjectExpression(node, state)
// - ObjectPattern: ?? ObjectPattern(node, state)
// - Program: ?? Program(node, state)
// - Property: ?? Property(node, state)
// - RegExpLiteral: ?? RegExpLiteral(node, state)
// - RestElement: ?? RestElement(node, state)
// - SequenceExpression: ?? SequenceExpression(node, state)
// - SpreadElement: ?? RestElement(node, state)
// - TaggedTemplateExpression: ?? TaggedTemplateExpression( node, state )
// - TemplateElement: ?? TemplateElement(node, state)
// - TemplateLiteral: ?? TemplateLiteral(node, state)
// - UnaryExpression: ?? UnaryExpression(node, state)
// - UpdateExpression: ?? UpdateExpression(node, state)
// - VariableDeclarator: ?? VariableDeclarator(node, state)
