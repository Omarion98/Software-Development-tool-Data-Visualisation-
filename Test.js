var nodes = (function() {
    var circle_radius = 7;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
  
    this.clear = function() {
      //color = d3.scaleOrdinal(d3.schemeCategory10);
    }
  
    var circle_click = function(graph, member) {
      if (!d3.event.shiftKey) {
        selection.clear();
        member_lines.clear();
      }
  
      var draw_member_lines = true;
  
      if (selection.size() > 0) {
        member_lines.clear();
        draw_member_lines = false;
      }
  
      var group = graph.nodes[graph.group_map[graph.member_map[member.id].group]];
  
      selection.add(member);
  
      if (!draw_member_lines) {
        selection.clear_contacts();
        return;
      }
  
      var start_x = group.x + member.circle.attr('cy')*1;
      var start_y = group.y + member.circle.attr('cx')*1;
  
      let NewLinks = [];
      let s = [];
  
      let GO = graph;
      for (var k in selected) s.push(k);
  
      var Filtered = s;
  
      if (Sink.includes(String(Object.values(Filtered)))) return;
  
      // node suchen
      for (i = 0; i < graph.nodes.length; i++) {
        if (graph.nodes[i].id == Filtered) {
          // links filteren
          
          let NewSinks = [];
          let Bool = true;
          let index = 0;
        
          while (Bool) {
  
            let n = 0; 
            for (j = 0; j < graph.links.length; j++) {
              let A = graph.links[j].source
              let B = graph.links[j].target
              
  
             let x = String(Object.values(A)).split(',[object')[0]
             let y = String(Object.values(B)).split(',[object')[0]
             let z1 = x[x.length - 1]
             let z2 = y[y.length - 1]
  
             if(z1 == ','){
                A = x.slice(0,x.length - 1)
               
             }
             else{
               A = x
  
             }
             if(z2 == ','){
               B = y.slice(0,x.length - 1)
  
            }
            else {
             B = y
  
          }
    
              if (A == String(Object.values(Filtered))) {
                n = 1;
                index = j;
              }
              
             if(n == 1) {
  
               if(!(Sink.includes(B))) {
                      
                  if(!(NewLinks.includes(A)))
                     NewLinks.push(A);
                     if(!(NewLinks.includes(B)))
                      NewLinks.push(B);
            }
  
            //Sink  erreicht
             if (Sink.includes(B)) {
               NewSinks.push(B);
               if(!(NewLinks.includes(A)))
                     NewLinks.push(A);
                     if(!(NewLinks.includes(B)))
                      NewLinks.push(B);
               graph.links.splice(index, 1);
               j =  graph.links.length;
  
            }
        }    
        }
                //fertig
                if (n == 0) {
                  Bool = false;
  
                  
  
              }
            }
            
          }
          graph = GO;
        }
      
  
      for (var cid in graph.all_links) {
          if(NewLinks.includes(cid)){
        var contact_member = graph.member_map[cid];
        var contact_group = graph.nodes[graph.group_map[contact_member.group]];
  
        // They are in the same group.
        if (contact_member.group === member.group) { continue }
  
        var end_x = contact_group.x + contact_member.cx;
        var end_y = contact_group.y + contact_member.cy;
  
  
        member_lines.add(start_x, start_y, end_x, end_y);
        selection.add(contact_member, 'contact');
   
      }
  
  }
    };
  
    var generateWedgeString = function(startX, startY, startAngle, endAngle, radius){
        var x1 = (startX + radius * Math.cos(Math.PI * startAngle/180)).toFixed(4);
        var y1 = (startY + radius * Math.sin(Math.PI * startAngle/180)).toFixed(4);
        var x2 = (startX + radius * Math.cos(Math.PI * endAngle/180)).toFixed(4);
        var y2 = (startY + radius * Math.sin(Math.PI * endAngle/180)).toFixed(4);
        var pathString = "M"+ startX + " " + startY + " L" + x1 + " " + y1 + " A" + radius + " " + radius + " 0 0 1 " + x2 + " " + y2 + " z";
        return pathString;
    }
  
    this.create_pie = function(graph, g, member, index, total) {
      var node = g.append('g').attr('class', 'membernode').attr('id', member.id)
        .attr('fill', color(member.type))
        .attr('name', 'default').on("click", function() {
          circle_click(graph, member);
        });
  
      var start = 90;
      var degrees = 360 / total;
      var start_deg = start + degrees * index;
      var end_deg = start + degrees * (index + 1);
  
      var arc = node.append("path").attr("d", generateWedgeString(0, 0, start_deg, end_deg, 5))
        .attr("class", "member");
  
      member.circle = arc;
  
      node.radius = function() {
        return 5;
      }
  
      node.set_position = function(x, y) {
        //
      };
  
      return node;
    }
  
    this.create_node = function(graph, g, member, scale) {
      var node = g.append('g').attr('class', 'membernode').attr('id', member.id)
        .attr('fill', color(member.type))
        .attr('name', 'default').on("click", function() {
          circle_click(graph, member);
        });
  
      var background = node.append("circle").attr("r", circle_radius * scale)
        .attr("class", "member-background");
  
      var circle = node.append("circle").attr("r", circle_radius * scale)
        .attr("class", "member");
  
      node.radius = function() {
        return circle_radius * scale;
      }
  
      member.circle = circle;
  
      node.set_position = function(x, y) {
        circle.attr('cx', x);
        circle.attr('cy', y);
        background.attr('cx', x);
        background.attr('cy', y);
      };
  
      return node;
    };
  
    return this;
  })();
  