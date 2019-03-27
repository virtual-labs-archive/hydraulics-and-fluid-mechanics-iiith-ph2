package com.vlab.fm;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GraphicsConfiguration;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.GridBagConstraints;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.media.j3d.AmbientLight;
import javax.media.j3d.Appearance;
import javax.media.j3d.BoundingSphere;
import javax.media.j3d.BranchGroup;
import javax.media.j3d.Canvas3D;
import javax.media.j3d.ColoringAttributes;
import javax.media.j3d.DirectionalLight;
import javax.media.j3d.GraphicsConfigTemplate3D;
import javax.media.j3d.Group;
import javax.media.j3d.LineAttributes;
import javax.media.j3d.Shape3D;
import javax.media.j3d.Switch;
import javax.media.j3d.Texture;
import javax.media.j3d.TextureAttributes;
import javax.media.j3d.Transform3D;
import javax.media.j3d.TransformGroup;
import javax.media.j3d.TriangleArray;
import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JApplet;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPopupMenu;
import javax.swing.JSlider;
import javax.swing.Timer;
import javax.swing.WindowConstants;
import javax.swing.border.EmptyBorder;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;
import javax.vecmath.AxisAngle4f;
import javax.vecmath.Color3f;
import javax.vecmath.Point3d;
import javax.vecmath.Point3f;
import javax.vecmath.Vector3d;
import javax.vecmath.Vector3f;

import com.sun.j3d.utils.geometry.GeometryInfo;
import com.sun.j3d.utils.geometry.NormalGenerator;
import com.sun.j3d.utils.image.TextureLoader;
import com.sun.j3d.utils.universe.PlatformGeometry;
import com.sun.j3d.utils.universe.SimpleUniverse;
import com.sun.j3d.utils.universe.ViewingPlatform;

//import eerc.vlab.common.FullViewGraph;
//import eerc.vlab.common.HelpWindow;
import eerc.vlab.common.HorizontalGraph;
import eerc.vlab.common.J3DShape;
import eerc.vlab.common.Resources;

/**
 * Simple Java 3D program that can be run as an application or as an applet.
 */
@SuppressWarnings( { "serial", "unused" })
public class Orifice extends javax.swing.JPanel {
	// Variables declaration - do not modify//GEN-BEGIN:variables
	// ////////////////////////GUI componenet ///////////////////////////
	private javax.swing.JPanel topPanel;
	private javax.swing.JPanel simulationPanel;
	private javax.swing.JPanel bottomPanel;
	private javax.swing.JPanel rightPanel;

	private javax.swing.JPanel in1; // Input panel 1
	private javax.swing.JPanel in2; // Input panel 2
	private javax.swing.JPanel in3; // Input panel 3

	private javax.swing.JButton startButton = null;
	private javax.swing.JButton reStartButton = null;
	private javax.swing.JButton nextButton = null;
	
	private HashMap hm_1 = new HashMap();

	String objImg, safty_factor = "1", materialGrade;
	private javax.swing.JButton rightIcon = null;

	// private GraphPlotter graphPlotter;
	// //////////////////////////Java3D componenet ///////////////////////////

	private SimpleUniverse univ = null; // Simple Universe Java3D
	private BranchGroup scene = null; // BranchGroup Scene graph
	//TransformGroup syringePos = new TransformGroup(new Transform3D());
	TransformGroup ink1Pos = new TransformGroup(new Transform3D());
	//TransformGroup ink2Pos = new TransformGroup(new Transform3D());
	//TransformGroup ink3Pos = new TransformGroup(new Transform3D());
	//TransformGroup ink4Pos = new TransformGroup(new Transform3D());
	
	
	private OrificeMeterBody freeBody = null; // Shape3D
	private HorizontalGraph outputGraph = null;
	private HorizontalGraph inputGraph = null;
	// private FullViewGraph fullViewGraph = new FullViewGraph();

	@SuppressWarnings("unchecked")
	private HashMap hm = new HashMap();
	private J3DShape m_j3d = new J3DShape();

	private float[] fields;
	private JLabel outlbl_val[];
	private JLabel iLabel[];
	private JLabel m_Objective = new JLabel("Objective:");

	private Timer timer = null;
	private Timer m_cameraTimer = null;
	private float m_cameraViews[];
	private int m_cameraEye;
	// Timer for simulation

	private int stage = 0;

	private boolean startStop = false;
	private boolean valChange = true;

	private JComboBox ch;
	private JComboBox che;
	private JLabel lbl_k;
	private JSlider m_Slider[] = new JSlider[5];
	private JLabel out_lbl[] = new JLabel[2];

	int flag = 0, val = 20;

	public BranchGroup createSceneGraph() {
		// Create the root of the branch graph
		BranchGroup objRoot = new BranchGroup();
		objRoot.setCapability(Group.ALLOW_CHILDREN_EXTEND );
		objRoot.setCapability(Group.ALLOW_CHILDREN_READ);
		objRoot.setCapability(Group.ALLOW_CHILDREN_WRITE);
		objRoot.setCapability( BranchGroup.ALLOW_DETACH );

		objRoot.addChild(createVirtualLab());
	
		//Floor
		
		int i,j;
		for(i=-4;i<=4;i++)
		{
			for(j=-4;j<=4;j++)
			{
				objRoot.addChild(m_j3d.createBox(new Vector3d((float)(i),-0.6,(float)(j)),new Vector3d(0.5,.01,0.5),new Vector3d(0,0,0),new Color3f(0.8f, 0.8f, 0.8f),"resources/images/tile.jpg"));
			}
		}

	//	objRoot.addChild(m_j3d.createBox(new Vector3d(0,-0.25, -.1),new Vector3d(3,.01,1),new Vector3d(0,0,0),new Color3f(0f, 1f, 0f),"resources/images/table.jpg"));
	//	objRoot.addChild(m_j3d.createBox(new Vector3d(0,0.4, -.6),new Vector3d(3,.9,.1),new Vector3d(0f, 0f,0f), new Color3f(0.5f,0.6f,0.72f)));
		objRoot.addChild(m_j3d.createBox(new Vector3d(0,0.4,-2.5),new Vector3d(10,10,.01),new Vector3d(0f, 0f,0f), new Color3f(0.5f,0.6f,0.72f)));
		
		// Walls and roof
		objRoot.addChild(m_j3d.createBox(new Vector3d(1,0.1f,0), new Vector3d(0.05,0.7f,2),new Vector3d(0,0,0),new Color3f(1f, 1f, 0.9f),"resources/images/floor.jpg"));
		objRoot.addChild(m_j3d.createBox(new Vector3d(-1,0.1f,0), new Vector3d(0.05,0.7f,2),new Vector3d(0,0,0),new Color3f(1f, 1f, 0.9f),"resources/images/floor.jpg"));
		objRoot.addChild(m_j3d.createBox(new Vector3d(0,0.1f,-2.0), new Vector3d(1,0.7f,0.05),new Vector3d(0,0,0),new Color3f(1f, 1f, 1.0f),"resources/images/floor.jpg"));
		objRoot.addChild(m_j3d.createBox(new Vector3d(0,0.84f,0), new Vector3d(1.05,0.04f,2),new Vector3d(0,0,0),new Color3f(1f, 1f, 1f),"resources/images/floor.jpg"));
		

		float rad = (float) Math.PI / 180;
		Transform3D t = new Transform3D();
		t.setScale(0.4);

		TransformGroup tg = new TransformGroup();
		t = new Transform3D();
		t.rotX(rad * 10);
		t.setScale(new Vector3d(.5f, .05f, .5f));
		t.setTranslation(new Vector3d(.3, .3, 0));
		tg.setTransform(t);
		freeBody = new OrificeMeterBody();
		return objRoot;
	}

public Group createQuad(Point3f A , Point3f B , Point3f C , Point3f D, Color3f colr,String texfile) {
        

		Transform3D t = new Transform3D();
		
		TransformGroup objtrans = new TransformGroup(t);
        objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
        objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
        
        
        
        Shape3D quad = new Shape3D();
        
        Point3f[] pts = new Point3f[8];
        // front
        pts[0]=C;
        pts[1]=D;
        pts[2]=A;
        pts[3]=B;
        //back
        pts[4]=C;
        pts[5]=B;
        pts[6]=A;
        pts[7]=D;
        
        int[] stripCounts= new int[2];
        stripCounts[0]=4;
        stripCounts[1]=4;

        int[] contourCount=new int[2];
        contourCount[0]=1;
        contourCount[1]=1;
        
        GeometryInfo gInf = new GeometryInfo(GeometryInfo.POLYGON_ARRAY);

        gInf.setCoordinates(pts);
        gInf.setStripCounts(stripCounts);
        gInf.setContourCounts(contourCount);

        NormalGenerator ng= new NormalGenerator();
        ng.setCreaseAngle ((float) Math.toRadians(30));
        ng.generateNormals(gInf);
        
        quad.setGeometry(gInf.getGeometryArray());
       
        Appearance app = new Appearance();
        ColoringAttributes ca = new ColoringAttributes();
        ca.setColor(colr);
        app.setCapability(Appearance.ALLOW_COLORING_ATTRIBUTES_WRITE);
        app.setColoringAttributes(ca);
        
        if(texfile!=null){
         	Texture tex = new TextureLoader(Resources.getResource(texfile),TextureLoader.BY_REFERENCE | TextureLoader.Y_UP,this).getTexture();
         	app.setTexture(tex);
     	    TextureAttributes texAttr = new TextureAttributes();
     	    texAttr.setTextureMode(TextureAttributes.MODULATE);
     	    app.setTextureAttributes(texAttr);
         }
      
        objtrans.addChild(quad);
        quad.setAppearance(app);
        return objtrans;

    }

	
	private Canvas3D createUniverse(Container container) {
		GraphicsDevice graphicsDevice;
		if (container.getGraphicsConfiguration() != null) {
			graphicsDevice = container.getGraphicsConfiguration().getDevice();
		} else {
			graphicsDevice = GraphicsEnvironment.getLocalGraphicsEnvironment()
					.getDefaultScreenDevice();
		}
		GraphicsConfigTemplate3D template = new GraphicsConfigTemplate3D();
		GraphicsConfiguration config = graphicsDevice
				.getBestConfiguration(template);

		Canvas3D c = new Canvas3D(config);

		univ = new SimpleUniverse(c);

		// This will move the ViewPlatform back a bit so the
		// objects in the scene can be viewed.

		ViewingPlatform viewingPlatform = univ.getViewingPlatform();
		setLight();

		univ.getViewingPlatform().setNominalViewingTransform();

		// Ensure at least 5 msec per frame (i.e., < 200Hz)
		univ.getViewer().getView().setMinimumFrameCycleTime(5);

		ViewingPlatform vp = univ.getViewingPlatform();
		TransformGroup steerTG = vp.getViewPlatformTransform();
		Transform3D t3d = new Transform3D();
		steerTG.getTransform(t3d);
		Vector3d s = new Vector3d();
		Vector3f currPos = new Vector3f();
		t3d.get(currPos);
		t3d.lookAt(new Point3d(0, 0.4, 2.81), new Point3d(0, 0, 0),
				new Vector3d(0, 1, 0));
		t3d.invert();
		steerTG.setTransform(t3d);

		return c;
	}

	private void setLight() {
		BoundingSphere bounds = new BoundingSphere(new Point3d(0.0, 0.0, 0.0),
				100.0);
		PlatformGeometry pg = new PlatformGeometry();

		Color3f ambientColor = new Color3f(0.1f, 0.1f, 0.1f);
		AmbientLight ambientLightNode = new AmbientLight(ambientColor);
		ambientLightNode.setInfluencingBounds(bounds);
		pg.addChild(ambientLightNode);

		Color3f light1Color = new Color3f(1.0f, 1.0f, 0.9f);
		Vector3f light1Direction = new Vector3f(1.0f, 1.0f, 1.0f);
		Color3f light2Color = new Color3f(1.0f, 1.0f, 1.0f);
		Vector3f light2Direction = new Vector3f(-1.0f, -1.0f, -1.0f);

		DirectionalLight light1 = new DirectionalLight(light1Color,
				light1Direction);
		light1.setInfluencingBounds(bounds);
		pg.addChild(light1);

		DirectionalLight light2 = new DirectionalLight(light2Color,
				light2Direction);
		light2.setInfluencingBounds(bounds);
		pg.addChild(light2);

		ViewingPlatform viewingPlatform = univ.getViewingPlatform();
		viewingPlatform.setPlatformGeometry(pg);

	}

	private void destroy() {
		univ.cleanup();
	}

	public TransformGroup showWaterFall()
	{
		Transform3D t3d = new Transform3D();
		t3d.setTranslation(new Vector3d(-.15f,-.09f,0.0f));
		TransformGroup trans_root = new TransformGroup();
		trans_root.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		trans_root.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		
		trans_root.setCapability(Group.ALLOW_CHILDREN_WRITE);
		trans_root.setCapability(Group.ALLOW_CHILDREN_WRITE);
		
		
		int i = 0;
		double pos_cylinder_x = 0.005;
		double pos_cylinder_y = 0.14;
		double pos_cylinder_z = 0.010;
		
		Double rad = 6.27; //= (Double)Math.PI/180;
		//rad = 0.0;
		double rate = 0.2;
		for(i = 0; i< 12; i++)
		{
		
		Transform3D t3d_1 = new Transform3D();
			
		TransformGroup trans = new TransformGroup();
	//	trans.setCapability(Group.ALLOW_CHILDREN_EXTEND);
		trans.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		trans.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		
		
		//Transform3D t3d1 = new Transform3D();
		//if(i <=8)
			trans.addChild(m_j3d.createCylinder(new Vector3d(pos_cylinder_x,pos_cylinder_y,pos_cylinder_z), new Vector3d(0.1,.15,.1),new Vector3d(0,0,90), new Color3f(0.2f,0.7f,.7f)));
		//else
			//trans.addChild(m_j3d.createCylinder(new Vector3d(pos_cylinder_x+0.1*i,pos_cylinder_y-0.1*i,pos_cylinder_z), new Vector3d(0.1,.15,.1),new Vector3d(0,0,90), new Color3f(0,0,1)));
		
		//if(i > 8)
			//rad = 6.28 - 0.1*i;
		t3d_1.rotZ(rad);
		rad -= 0.005;
		
		//if(rad >= 30 && rad < 90)
		//	t3d1.rotZ(rad-0.18);
		
		trans.setTransform(t3d_1);
		
		pos_cylinder_x += 0.0;
		pos_cylinder_y -= 0.0;
		pos_cylinder_z += 0.0;
		trans_root.addChild(trans);
		//if(i <=8)
			hm_1.put("radians_waterfall"+i, rad);
		}
		
		hm_1.put("trans_rotateZ", trans_root);
		
		return trans_root;
	}
	
	private Group createVirtualLab() {

		 Transform3D t = new Transform3D();
	     
	                 
		    TransformGroup objtrans = new TransformGroup(t);
		    objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		    objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		    
		    Transform3D t1 = new Transform3D();
		 //   Transform3D t2 = new Transform3D();
		    Transform3D inktrans1 = new Transform3D();
		    
		    inktrans1.setTranslation(new Vector3d(-0.255f,0.44f,0));
		    t1.setTranslation(new Vector3d(0.0f,-0.16f,-0.1));
		    
		    TransformGroup ink1 = new TransformGroup(inktrans1);
		
		    ink1.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		    ink1.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		   	
		    Transform3D t2 = new Transform3D();
		    t2.setRotation(new AxisAngle4f(0,1,0,-60*3.14f/180));
		    
		    TransformGroup objtrans_small = new TransformGroup(t2);
		    objtrans_small.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		    objtrans_small.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		    
//		     hm.put("small_cylinder",objtrans_small);
		    
		    // Big Tank
		    objtrans.addChild(createQuad(new Point3f(-0.5f,-0.02f,0f),new Point3f(-.5f,0.28f,0f),new Point3f(-.15f,0.21f,0.0f),new Point3f(-.15f,-.09f,0.0f),new Color3f(.3f,.3f,.3f), null));
		    objtrans.addChild(createQuad(new Point3f(-0.5f,0.28f,0f),new Point3f(-.21f,0.42f,0f),new Point3f(-0.21f,0.35f,0.0f),new Point3f(-0.40f,0.26f,0),new Color3f(.4f,.4f,0.4f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.21f,0.35f,0.0f),new Point3f(-.21f,0.42f,0f),new Point3f(0.12f,0.35f,0.0f),new Point3f(0.035f,0.30f,0.0f),new Color3f(.4f,.4f,0.4f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.15f,0.21f,0f),new Point3f(.12f,0.35f,0f),new Point3f(.12f,0.05f,0.0f),new Point3f(-.15f,-.09f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.5f,-0.02f,0f),new Point3f(-.5f,-0.3f,0f),new Point3f(-0.42f,-0.33f,0.0f),new Point3f(-0.42f,-0.033f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(-.15f,-.09f,0.0f),new Point3f(-0.15f,-0.39f,0.0f),new Point3f(-0.23f,-0.37f,0.0f),new Point3f(-0.23f,-0.07f,0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(.12f,0.05f,0.0f),new Point3f(0.12f,-0.029f,0.0f),new Point3f(0.08f,-0.043f,0.0f),new Point3f(.08f,0.03f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.40f,0.26f,0),new Point3f(-0.21f,0.35f,0.0f),new Point3f(0.035f,0.30f,0.0f),new Point3f(-.15f,0.21f,0.0f),new Color3f(.2f,0.7f,.7f),null));
		    
		    objtrans_small.addChild(m_j3d.createCylinder(new Vector3d(.025,0.14,0.015), new Vector3d(0.40,0.3,.15),new Vector3d(0,0,90), new Color3f(0f,0f,0f)));
		    //objtrans_small.addChild(m_j3d.createCylinder(new Vector3d(.01,0.14,0.015), new Vector3d(0.40,.5,.15),new Vector3d(,0,1), new Color3f(0.4f,0.4f,0.4f)));
		    //objtrans.addChild(m_j3d.createCylinder(new Vector3d(.01,0.14,0.015), new Vector3d(0.40,.5,.15),new Vector3d(60,0,-1), new Color3f(0.4f,0.4f,0.4f)));
		    objtrans.addChild(objtrans_small);
		    objtrans.addChild(m_j3d.createCylinder(new Vector3d(.01,0.14,-0.015), new Vector3d(0.10,.4,.15),new Vector3d(60,0,-1), new Color3f(0.2f,0.7f,.7f)));
		    objtrans.addChild(showWaterFall());
		    
		    objtrans.addChild(m_j3d.createBox(new Vector3d(-0.35f,.48f,.05f),new Vector3d(.09f,.06f,.0006f), new Vector3d(0.0f,0.0f,0.0f),new Color3f(1f,1f,1f),"resources/images/tap.gif"));
		    
		    //  Small Tank
		    
		    objtrans.addChild(createQuad(new Point3f(-0.07f,-0.34f,0f),new Point3f(-0.07f,-0.12f,0f),new Point3f(.22f,-0.18f,0.0f),new Point3f(0.23f,-0.40f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.07f,-0.12f,0f),new Point3f(0.22f,0.034f,0.0f),new Point3f(.22f,-0.03f,0.0f),new Point3f(0.008f,-0.137f,0.0f),new Color3f(.4f,.4f,0.4f),null));
		    objtrans.addChild(createQuad(new Point3f(.22f,-0.03f,0.0f),new Point3f(0.22f,0.034f,0.0f),new Point3f(.46f,-0.032f,0.0f),new Point3f(.4f,-0.07f,0.0f),new Color3f(.4f,.4f,0.4f),null));
		    objtrans.addChild(createQuad(new Point3f(.23f,-0.48f,0.0f),new Point3f(.22f,-0.18f,0.0f),new Point3f(.46f,-0.032f,0.0f),new Point3f(.46f,-0.35f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(-0.07f,-0.34f,0f),new Point3f(-0.07f,-0.42f,0.0f),new Point3f(-0.012f,-0.435f,0f),new Point3f(-0.012f,-0.35f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(0.23f,-0.40f,0.0f),new Point3f(.23f,-0.48f,0.0f),new Point3f(0.15f,-0.465f,0f),new Point3f(.15f,-0.38f,0.0f),new Color3f(0.3f,0.3f,0.3f),null));
		    objtrans.addChild(createQuad(new Point3f(0.008f,-0.137f,0.0f),new Point3f(.22f,-0.03f,0.0f),new Point3f(.4f,-0.07f,0.0f),new Point3f(.22f,-0.18f,0.0f),new Color3f(.2f,.7f,.7f),null));
		  //  objtrans.addChild(createQuad(new Point3f(.25f,-0.37f,0.001f),new Point3f(.25f,-0.164f,0.001f),new Point3f(.27f,-0.147f,0.001f),new Point3f(.27f,-0.350f,0.001f),new Color3f(1f,1f,1f),"resources/images/ruler.jpg"));
		//    objtrans.addChild(m_j3d.createBox(new Vector3d(.35f,-.2f,.05f),new Vector3d(.06f,.045f,.0006f), new Vector3d(0.0f,0.0f,0.0f),new Color3f(1f,1f,1f),"resources/images/tap2.gif"));

		    // water from the tap
		   	ink1Pos.addChild(m_j3d.createCylinder(new Vector3d(-.029,0.007,0.015), new Vector3d(0.13,.4,.15),new Vector3d(0,0,-1), new Color3f(0.2f,0.7f,.7f)));

		    objtrans.addChild(ink1);
	        ink1.addChild(ink1Pos);
		    return objtrans;
		    	
	}

	/**
	 * Creates new form FreeVibration
	 */
	public Orifice(Container container) {
		// Initialize the GUI components
		JPopupMenu.setDefaultLightWeightPopupEnabled(false);
		initComponents();

		centerPanel(container);
		// Create Canvas3D and SimpleUniverse; add canvas to drawing panel

		// scene.addChild(bgleg);
	}

	// ----------------------------------------------------------------

	// Applet framework

	public static class MyApplet extends JApplet {
		Orifice mainPanel;

		public void init() {
			setLayout(new BorderLayout());
			mainPanel = new Orifice(this);
			add(mainPanel, BorderLayout.CENTER);

		}

		public void destroy() {
			mainPanel.destroy();
		}
	}

	// Application framework

	private static class MyFrame extends JFrame {
		MyFrame() {
			setLayout(new BorderLayout());
			setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
			setTitle("Orifice Experiment");
			getContentPane().add(new Orifice(this), BorderLayout.CENTER);
			pack();
		}
	}

	// Create a form with the specified labels, tooltips, and sizes.
	/**
	 * @param args
	 *            the command line arguments
	 */
	public static void main(String args[]) {
		java.awt.EventQueue.invokeLater(new Runnable() {
			public void run() {
				new MyFrame().setVisible(true);
			}
		});
	}

	private void initComponents() {

//		syringePos.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		ink1Pos.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
//		ink2Pos.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
//		ink3Pos.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
//		ink4Pos.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		setLayout(new java.awt.BorderLayout());

		bottomPanel = new javax.swing.JPanel(); // input from user at bottom
		simulationPanel = new javax.swing.JPanel(); // 3D rendering at center
		topPanel = new javax.swing.JPanel(); // Pause, resume, Next
		rightPanel = new javax.swing.JPanel(); // Graph and Input and Output
		// Parameter

		topPanel();
		bottomPanel();
		rightPanel();

		// Set Alignment
		// add(guiPanel, java.awt.BorderLayout.NORTH);
		add(topPanel, java.awt.BorderLayout.NORTH);
		add(simulationPanel, java.awt.BorderLayout.CENTER);
		add(bottomPanel, java.awt.BorderLayout.SOUTH);
		add(rightPanel, java.awt.BorderLayout.EAST);

		startStop = false;
		valChange = true;
		stage = 0;

		timer = new Timer(400, new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				// ...Perform a task...
				timerActionPerformed(evt);
				timer.setInitialDelay(0);
			}
		});

	}// </editor-fold>//GEN-END:initComponents

	private void topPanel() {

		java.awt.GridBagConstraints gridBagConstraints;

		javax.swing.JPanel guiPanel = new javax.swing.JPanel(); // Pause, resume
		// at top
		guiPanel.setLayout(new java.awt.GridBagLayout());
		gridBagConstraints = new java.awt.GridBagConstraints();
		gridBagConstraints.insets = new java.awt.Insets(4, 4, 4, 4);

		// javax.swing.JButton pauseButton = new javax.swing.JButton();
		// javax.swing.JButton startButton = new javax.swing.JButton();
		reStartButton = new javax.swing.JButton("Re-Start");
		ImageIcon icon = m_j3d.createImageIcon("resources/icons/restart.png");
		reStartButton.setIcon(icon);
		startButton = new javax.swing.JButton("Start");
		icon = m_j3d.createImageIcon("resources/icons/start.png");
		startButton.setIcon(icon);
		nextButton = new javax.swing.JButton("Next");
		icon = m_j3d.createImageIcon("resources/icons/next.png");
		nextButton.setIcon(icon);
		// ImageIcon icon =
		// m_j3d.createImageIcon("resources/images/show_graph.png");
		// startButton.setIcon(icon);
		// startButton.setPreferredSize(new Dimension(100,30));

		// reStartButton.setText("Re-Start");
		reStartButton.setEnabled(false);
		nextButton.setEnabled(false);

		guiPanel.setBackground(new Color(67, 143, 205));// Color.BLACK
		topPanel.setLayout(new java.awt.BorderLayout());
		topPanel.add(guiPanel, java.awt.BorderLayout.NORTH);

		startButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				// Toggle
				startStop = !startStop;

				if (startStop)
					startSimulation(evt);
				else
					pauseSimulation();
				univ.getCanvas().repaint();
			}
		});

		reStartButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				reStartButton.setEnabled(false);
				// startButton.setEnabled(true);
				startButton.setText("Start");
				startStop = !startStop;
				// startStop = false;
				//                
				// outputGraph.clearGraphValue();
				// inputGraph.clearGraphValue();
				//                
				valChange = true;
				startSimulation(evt);
				univ.getCanvas().repaint();

			}
		});

		nextButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				stage++;
				nextButton.setEnabled(false);
				onNextStage();
				univ.getCanvas().repaint();
			}
		});

		  	
	

		guiPanel.add(reStartButton, gridBagConstraints);
		guiPanel.add(startButton, gridBagConstraints);
		guiPanel.add(nextButton, gridBagConstraints);

		

	}

	private void rightPanel() {

		rightPanel.setLayout(new java.awt.BorderLayout());

		JPanel panel = new JPanel();
		panel.setBackground(new Color(140, 200, 240));
		panel.setBorder(BorderFactory.createLineBorder(
				new Color(132, 132, 255), 4));
		panel.setBorder(new EmptyBorder(10, 10, 0, 0));

		rightPanel.setVisible(false);

	}

	private static void enable(Container root, boolean enable) {
		//Component children[] = root.getComponents();
		//for (int i = 0; i < children.length; i++)
		//	children[i].setEnabled(enable);
		return;
	}

	private void centerPanel(Container container) {

		simulationPanel.setPreferredSize(new java.awt.Dimension(1024, 600));
		simulationPanel.setLayout(new java.awt.BorderLayout());

		javax.swing.JPanel guiPanel = new javax.swing.JPanel();
		guiPanel.setBackground(new Color(100, 100, 100));
		JLabel lbl = new JLabel("Orifice Experiment", JLabel.CENTER);
		lbl.setFont(new Font("Arial", Font.BOLD, 18));

		lbl.setForeground(Color.orange);

		guiPanel.add(lbl);
		simulationPanel.add(guiPanel, BorderLayout.NORTH);

		Canvas3D c = createUniverse(container);
		simulationPanel.add(c, BorderLayout.CENTER);

		JPanel btmPanel = new javax.swing.JPanel(new java.awt.BorderLayout());
		simulationPanel.add(btmPanel, BorderLayout.SOUTH);

		guiPanel = new javax.swing.JPanel();
		guiPanel.setBackground(new Color(100, 100, 100));
		simulationPanel.add(guiPanel, BorderLayout.EAST);

		guiPanel = new javax.swing.JPanel();
		guiPanel.setBackground(new Color(100, 100, 100));
		simulationPanel.add(guiPanel, BorderLayout.WEST);

		// Create the content branch and add it to the universe
		scene = createSceneGraph();
		univ.addBranchGraph(scene);

		m_Objective = new JLabel(" ", JLabel.LEFT);
		m_Objective.setFont(new Font("Arial", Font.BOLD, 13));
		m_Objective.setForeground(Color.WHITE);
		guiPanel = new javax.swing.JPanel();
		guiPanel.setBackground(new Color(100, 100, 100));
		guiPanel.add(m_Objective);
		btmPanel.add(guiPanel, BorderLayout.NORTH);

		guiPanel = new javax.swing.JPanel(); //          
		guiPanel.setBackground(new Color(235, 233, 215));
		guiPanel.setLayout(new java.awt.GridBagLayout());
		java.awt.GridBagConstraints gridBagConstraints = new java.awt.GridBagConstraints();
		guiPanel.setBorder(BorderFactory.createLineBorder(new Color(140, 200,
				240), 8));
		gridBagConstraints.insets = new java.awt.Insets(4, 4, 4, 4);

	

		JCheckBox chkbox = new JCheckBox("");
		lbl = new JLabel("Change Input Parameters", JLabel.CENTER);
		ImageIcon icon = m_j3d.createImageIcon("resources/icons/tasklist.png");
		lbl.setIcon(icon);
		chkbox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {
				boolean bChecked = ((JCheckBox) event.getSource()).isSelected();
				if (bChecked)
					bottomPanel.setVisible(true);
				else
					bottomPanel.setVisible(false);
				univ.getCanvas().repaint();

			}
		});

		guiPanel.add(chkbox, gridBagConstraints);
		guiPanel.add(lbl, gridBagConstraints);

		chkbox = new JCheckBox("");
		lbl = new JLabel("Show Results", JLabel.CENTER);

		icon = m_j3d.createImageIcon("resources/icons/show_graph.png");
		lbl.setIcon(icon);
		chkbox.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent event) {
				boolean bChecked = ((JCheckBox) event.getSource()).isSelected();
				if (bChecked)
					rightPanel.setVisible(true);
				else
					rightPanel.setVisible(false);
				univ.getCanvas().repaint();

			}
		});
		// guiPanel.add(chkbox, gridBagConstraints);
		// guiPanel.add(lbl, gridBagConstraints);

		btmPanel.add(guiPanel, BorderLayout.CENTER);

		guiPanel = new javax.swing.JPanel(); // 
		guiPanel.setBackground(new Color(130, 169, 193));
		guiPanel.setBorder(BorderFactory.createLineBorder(new Color(235, 233,
				215), 4));
		// guiPanel.add(createInputOutputPanel());
		// btmPanel.add(guiPanel,BorderLayout.SOUTH);

	}

	private void bottomPanel() {
		initInputControlsField();

		Color bk = new Color(219, 226, 238);
		bottomPanel.setLayout(new java.awt.GridLayout(1, 3));
		bottomPanel.setBackground(Color.black);
		bottomPanel.setBorder(BorderFactory.createLineBorder(new Color(235,
				233, 215), 8));

		in1 = new JPanel(new java.awt.GridLayout(3, 3));
		in1.setBackground(bk);
		bottomPanel.add(in1);

		in2 = new JPanel(new java.awt.GridLayout(3, 3));
		in2.setBackground(bk);

		bottomPanel.add(in2);

		in3 = new JPanel(new java.awt.GridLayout(3, 3));
		in3.setBackground(bk);
		bottomPanel.add(in3);

	
		JLabel lab = new JLabel("H", JLabel.CENTER);
		m_Slider[0] = new JSlider(JSlider.HORIZONTAL, 1, 10, 1);
		m_Slider[0].addChangeListener(new ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				valChange = true;
				int val = ((JSlider) e.getSource()).getValue();
				fields[0] = val;
				// double mass = getMass();
				// outlbl_val[0].setText(mass + " Kg");
				iLabel[0].setText(":: " + fields[0] * 100 + " mm");

				repaint();
			}
		});
		m_Slider[0].setBackground(bk);
		in1.add(lab);
		in1.add(m_Slider[0]);
		in1.add(iLabel[0]);

		lab = new JLabel("D1 ", JLabel.CENTER);
		m_Slider[1] = new JSlider(JSlider.HORIZONTAL, 1, 15, 1);
		m_Slider[1].addChangeListener(new ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				valChange = true;
				int val = ((JSlider) e.getSource()).getValue();
				fields[1] = val;
				// double mass = getMass();
				// outlbl_val[0].setText(mass + " Kg");
				iLabel[1].setText(":: " + fields[1] * 10 + " mm");

				repaint();
			}
		});
		m_Slider[1].setBackground(bk);
		in1.add(lab);
		in1.add(m_Slider[1]);
		in1.add(iLabel[1]);

		lab = new JLabel("D2 ", JLabel.CENTER);
		m_Slider[2] = new JSlider(JSlider.HORIZONTAL, 1, 15, 1);
		m_Slider[2].addChangeListener(new ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				valChange = true;
				int val = ((JSlider) e.getSource()).getValue();
				fields[2] = val;
				// double mass = getMass();
				// outlbl_val[0].setText(mass + " Kg");
				iLabel[2].setText(":: " + fields[2] * 10 + " m");

				repaint();
			}
		});
		m_Slider[2].setBackground(bk);
		in1.add(lab);
		in1.add(m_Slider[2]);
		in1.add(iLabel[2]);

		lab = new JLabel("Orifice Dia", JLabel.CENTER);

		m_Slider[3] = new JSlider(JSlider.HORIZONTAL, 1, 10, 1);
		m_Slider[3].addChangeListener(new ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				valChange = true;
				int val = ((JSlider) e.getSource()).getValue();
				fields[3] = val;
				// double mass = getMass(); // this line and the below line just
				// added
				// outlbl_val[0].setText(mass + " Kg");
				iLabel[3].setText(":: " + fields[3] * 10 + " mm");
				m_Slider[3].setValue(val);

				repaint();
			}
		});
		m_Slider[3].setBackground(bk);
		in2.add(lab);
		in2.add(m_Slider[3]);
		in2.add(iLabel[3]);
		iLabel[3].setForeground(Color.BLUE);

		lab = new JLabel("Time ", JLabel.CENTER);
		m_Slider[4] = new JSlider(JSlider.HORIZONTAL, 1, 30, 1);
		m_Slider[4].addChangeListener(new ChangeListener() {
			public void stateChanged(ChangeEvent e) {
				valChange = true;
				int val = ((JSlider) e.getSource()).getValue();
				fields[4] = val;
				iLabel[4].setText(":: " + fields[4] + " ");
				repaint();
			}
		});
		m_Slider[4].setBackground(bk);
		in2.add(lab);
		in2.add(m_Slider[4]);
		in2.add(iLabel[4]);
		iLabel[4].setForeground(Color.BLUE);
		lab = new JLabel("        ", JLabel.LEFT);
		in2.add(lab);

	
		
		outlbl_val = new JLabel[3];
		lab = new JLabel("Q Actual ", JLabel.RIGHT);
		outlbl_val[0] = new JLabel(" 0 ", JLabel.RIGHT);
		in3.add(lab);
		in3.add(outlbl_val[0]);

		lab = new JLabel("Q Theoritical ", JLabel.RIGHT);
		outlbl_val[1] = new JLabel(" 0 ", JLabel.RIGHT);
		in3.add(lab);
		in3.add(outlbl_val[1]);

		lab = new JLabel(" Coefficient ", JLabel.RIGHT);
		outlbl_val[2] = new JLabel("  ", JLabel.RIGHT);
		in3.add(lab);
		in3.add(outlbl_val[2]);

		bottomPanel.setVisible(false);
		// ///////// Enable/Disable function for Input parameters
		enable(in1, false);
		enable(in2, false);
		enable(in3, false);
	}

	private double getHt() {

		return (double) fields[0] * 100.0;
	}

	private double getD1() {

		return (double) fields[1] * 10;
	}

	private double getD2() {

		return (double) fields[2] * 10;
	}

	private double getDia() {
		return (double) fields[3] * 10;
	}

	private int getTime() {
		return (int) fields[4];
	}


	private void initInputControlsField() {

		iLabel = new JLabel[9];
		int i = 0;
		iLabel[i] = new JLabel(":: 100 mm ", JLabel.LEFT);
		iLabel[i++].setForeground(Color.blue);// new JLabel(":Shear (Hinge)",
												// JLabel.LEFT);
												// iLabel[i++].setForeground(Color.blue);
		iLabel[i] = new JLabel(":: 10 mm ", JLabel.LEFT);
		iLabel[i++].setForeground(Color.blue);
		iLabel[i] = new JLabel(":: 10 mm ", JLabel.LEFT);
		iLabel[i++].setForeground(Color.blue);
		iLabel[i] = new JLabel(":: 10 mm", JLabel.LEFT);
		iLabel[i++].setForeground(Color.blue);
		iLabel[i] = new JLabel(":: 1 sec", JLabel.LEFT);
		iLabel[i++].setForeground(Color.blue);
		i = 0;
		fields = new float[9];
		fields[0] = 100;
		fields[1] = 10;
		fields[2] = 10;
		fields[3] = 10;
		fields[4] = 1;
	
	}

	private void onNextStage() {

		valChange = true;
		resetOutputParameters();
		bottomPanel.setVisible(true);
		enableStage(stage);
		setInstructionText();

	}

	private void enableStage(int s) {
		switch (s) {
		case 0: // Home
			enable(in1, false);
			enable(in2, false);
			enable(in3, false);

			break;

		case 1:

			enable(in1, true);
			enable(in2, true);
			enable(in3, true);
			
			break;
 
		case 2:

			enable(in1, true);
			enable(in2, true);
			enable(in3, true);			
			break;
			
		case 3:

			enable(in1, true);
			enable(in2, true);
			enable(in3, true);
			nextButton.setVisible(false);
			break;

	

		}

	}

	private void setInstructionText() {

		valChange = true;
		resetOutputParameters();

		switch (stage) {
		case 0: // Home
			m_Objective.setText(" ");
			m_Objective.setForeground(Color.WHITE);
			break;
		case 1:
			m_Objective.setText(" ");
			m_Objective.setForeground(Color.GREEN);
			break;
		case 2:
			m_Objective.setText(" ");
			m_Objective.setForeground(Color.GREEN);
			break;
		case 3:
			m_Objective.setText(" ");
			m_Objective.setForeground(Color.GREEN);
			break;
		case 4:
			m_Objective.setText(" ");
			m_Objective.setForeground(Color.GREEN);
			break;

		}

	}

	private void resetOutputParameters() {
		int i = 2;

		// outlbl_val[i++].setText(" 0 sec");
		// outlbl_val[i++].setText(" 0 (m/s)");

	}

	private void setCameraViews() {
		m_cameraViews = new float[360];
		int i = 0;
		for (i = 0; i < 90; i++)
			m_cameraViews[i] = i;
		for (int j = 0; j < 90; j++, i++)
			m_cameraViews[i] = (90 - j);
		for (int j = 0; j < 90; j++, i++)
			m_cameraViews[i] = -j;
		for (int j = 0; j < 90; j++, i++)
			m_cameraViews[i] = -(90 - j);

		m_cameraEye = 0;

	}

	private void timerActionVerticalCameraMotion(java.awt.event.ActionEvent evt) {
		ViewingPlatform vp = univ.getViewingPlatform();
		TransformGroup steerTG = vp.getViewPlatformTransform();
		Transform3D t3d = new Transform3D();
		steerTG.getTransform(t3d);

		Vector3f currPos = new Vector3f();
		t3d.get(currPos);

		float y = (float) (float) Math.sin(Math
				.toRadians(m_cameraViews[m_cameraEye]));
		float z = 2.41f - Math.abs(y);

		t3d.lookAt(new Point3d(0, y, z), new Point3d(0, 0, 0), new Vector3d(0,
				1, 0));
		t3d.invert();

		steerTG.setTransform(t3d);
		m_cameraEye++;
		if (m_cameraEye == 180) {
			m_cameraTimer.stop();
			m_cameraEye = 0;
		}
	}

	private void timerActionHorizontalCameraMotion(
			java.awt.event.ActionEvent evt) {
		ViewingPlatform vp = univ.getViewingPlatform();
		TransformGroup steerTG = vp.getViewPlatformTransform();
		Transform3D t3d = new Transform3D();
		steerTG.getTransform(t3d);

		Vector3f currPos = new Vector3f();
		t3d.get(currPos);

		float x = (float) (float) Math.sin(Math
				.toRadians(m_cameraViews[m_cameraEye]));
		float z = 2.41f - Math.abs(x);

		t3d.lookAt(new Point3d(x, 0, z), new Point3d(0, 0, 0), new Vector3d(0,
				1, 0));
		t3d.invert();

		steerTG.setTransform(t3d);
		m_cameraEye++;
		if (m_cameraEye == 360) {
			m_cameraTimer.stop();
			m_cameraEye = 0;
		}
	}

	private void startSimulation(java.awt.event.ActionEvent evt)
	{
		ImageIcon icon = m_j3d.createImageIcon("resources/icons/stop.png");
		startButton.setIcon(icon);
		startButton.setText("Stop");
		enableStage(0);
		reStartButton.setEnabled(false);
		nextButton.setEnabled(false);
		if (valChange) {
			double Ht = getHt();
			freeBody.Init(Ht, getD1(), getD2(), getDia(), getTime());
		}

		timer.start();
		
		System.out.println("Timer started");
	}

	/*
	public void update_smallCylinder()
	{
		//Transform3D t2 = new Transform3D();
	    //t2.setRotation(new AxisAngle4f(1,0,0,-60*3.14f/180));
	    
	    //TransformGroup objtrans_small = new TransformGroup(t2);
	    //objtrans_small.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
	    //objtrans_small.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
	    //objtrans_small.addChild(m_j3d.createCylinder(new Vector3d(.01,0.14,0.015), new Vector3d(0.50,0.3,.15),new Vector3d(0,0,90), new Color3f(1f,1f,1f)));
	    
	     //hm.put("small_cylinder",objtrans_small);
		
		
		TransformGroup trans = (TransformGroup)hm.get("small_cylinder");
		System.out.println(trans);
		trans.removeChild(0);
		trans.setChild(m_j3d.createCylinder(new Vector3d(.01,0.14,0.015), new Vector3d(0.50,0.3,.15),new Vector3d(0,0,90), new Color3f(1f,1f,1f)),0);
		
	}
	*/
	private void timerActionPerformed(java.awt.event.ActionEvent evt) {
		
		float Mass = (float) (freeBody.getQA());
		float Stiff = (float) (freeBody.getQT());
		float CD = Mass / Stiff;
		int jp = 0;
		// ///////// Text
		
//		update_smallCylinder();

		outlbl_val[jp++].setText(String.valueOf(Mass) + " ");
		outlbl_val[jp++].setText(String.valueOf(Stiff) + " ");

		outlbl_val[jp++].setText(String.valueOf(CD) + " ");

		int i = 0; 
		stage ++;
		Transform3D ink1move = new Transform3D();
		if(stage < 10)
		{
			ink1move.setTranslation(new Vector3d(0,-(float)stage/100,0));
			ink1move.setScale(new Vector3d(1,(float)stage/2.6,1));
			
			ink1Pos.setTransform(ink1move);
		}
		//Double rad = (Double)hm_1.get("radians_waterfall");
		if(stage>14)
		{
			int j = 0;
			double rate = 0.15; 
			//rad = 0.0;
			for(j = 0; j<12; j++)
			{
				String arr = "trans_rotateZ";
				String rad_arr = "radians_waterfall"+j;
				Double rad = (Double)hm_1.get(rad_arr);
				TransformGroup trans = (TransformGroup)((TransformGroup)hm_1.get(arr)).getChild(j);
	
			//	System.out.println("before" + rad);
		
				if(rad < 5.23)
				{
				rad = 6.28;
			}
			rad = rad - 0.01*rate;
			Transform3D t3d = new Transform3D();
			trans.getTransform(t3d);
			t3d.rotZ(rad);
			trans.setTransform(t3d);
			hm_1.put(rad_arr,rad);
			rate = rate + 10;

		}
		return;
		}
	}

	private void updateSimulationBody(double disp) {

		float rad = (float) Math.PI / 180;
		Transform3D trans = new Transform3D();
		TransformGroup tgp = (TransformGroup) hm.get("cylinder");
		tgp.getTransform(trans);
		Vector3d s = new Vector3d();
		trans.getScale(s);
		float val = (float) disp * 200;
		trans.rotZ(rad * val);
		trans.setScale(s);
		trans.setTranslation(new Vector3d(0, -0.21, -0.1));
		tgp.setTransform(trans);

	}

	private void pauseSimulation() {

		timer.stop();
		
		ImageIcon icon = m_j3d.createImageIcon("resources/icons/start.png");
		startButton.setIcon(icon);
		startButton.setText("Start");
		reStartButton.setEnabled(true);
		nextButton.setEnabled(true);
		// rightPanel.setVisible(true);
		enableStage(stage);
		// outputGraph.setState(0);
		// inputGraph.setState(0);
		valChange = false;
		repaint();
	}

	public void update(float addy) {

		Vector3d s = new Vector3d();
		// Get Scale

		TransformGroup objtrans = (TransformGroup) hm.get("target1");
		Transform3D trans = new Transform3D();
		objtrans.getTransform(trans);
		trans.getScale(s);
		trans.setScale(s);
		trans.setTranslation(new Vector3d(0.4, 0.272 - addy, 0.1));

		objtrans.setTransform(trans);

	}

	public void update1(float addy) {

		Vector3d s = new Vector3d();
		// Get Scale

		TransformGroup objtrans = (TransformGroup) hm.get("target2");
		Transform3D trans = new Transform3D();
		objtrans.getTransform(trans);
		trans.getScale(s);
		trans.setScale(s);
		trans.setTranslation(new Vector3d(0.4, 0.272 - addy, 0.1));

		objtrans.setTransform(trans);

	}

	public void cool() {
		try {
			Thread.sleep(250); // do nothing for 1000 miliseconds (1 second)
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	public Group createTriangle(Point3d point1, Point3d point2, Point3d point3,
			Vector3d scale, Vector3d rot, Color3f color) {
		Transform3D t = new Transform3D();
		float rad = (float) Math.PI / 180;
		if (rot.x != 0)
			t.rotX(rad * rot.x);
		else if (rot.y != 0)

			t.rotY(rad * rot.y);
		else if (rot.z != 0)
			t.rotZ(rad * rot.z);
		t.setScale(scale);
		TransformGroup objtrans = new TransformGroup(t);
		objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_WRITE);
		objtrans.setCapability(TransformGroup.ALLOW_TRANSFORM_READ);
		Shape3D shape = new Shape3D();
		TriangleArray tri = new TriangleArray(3, TriangleArray.COORDINATES
				| TriangleArray.COLOR_3);
		tri.setCoordinate(0, point1);
		tri.setCoordinate(1, point2);
		tri.setCoordinate(2, point3);
		tri.setColor(0, color);
		tri.setColor(1, color);
		tri.setColor(2, color);
		shape.setGeometry(tri);
		objtrans.addChild(shape);
		return objtrans;

	}

}

class OrificeMeterBody {

	private double A1, A2, a, g, QA, QT;
	
	public void Init(double Ht, double D1, double D2, double Dia, int t) {
		a=0.36;
		g=9.81;
		System.out.println("Height :" + Ht + "D1= " + D1 + "D2 :" + D2
				+ "Orifice dia :" + Dia + "Time :" + t);
		A1 = (Math.PI / 4) * D1 * D1;
		A2 = (Math.PI / 4) * D2 * D2;
		QA = (a * Ht) / t;
		QT = A1 * A2 * Math.sqrt(2 * g * Ht) / Math.sqrt((A1 * A1) - (A2 * A2));
//		CD = QA / QT;
	}

	public double getQA() {
		return QA;
	}

	public double getQT() {
		return QT;
	}

	}

